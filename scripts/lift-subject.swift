// Menghapus latar belakang foto memakai Vision bawaan macOS
// (VNGenerateForegroundInstanceMaskRequest — "Lift Subject").
// Jalankan: swift scripts/lift-subject.swift <input> <output.png> [largest|all]
import Foundation
import CoreImage
import Vision
import ImageIO
import UniformTypeIdentifiers

func fail(_ message: String) -> Never {
    FileHandle.standardError.write("\(message)\n".data(using: .utf8)!)
    exit(1)
}

let args = CommandLine.arguments
guard args.count >= 3 else {
    FileHandle.standardError.write("usage: lift-subject <input> <output.png> [largest|all]\n".data(using: .utf8)!)
    exit(2)
}
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
let mode = args.count > 3 ? args[3] : "largest"

guard let source = CGImageSourceCreateWithURL(inURL as CFURL, nil),
      let cgImage = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
    fail("gagal membaca \(inURL.path)")
}
print("input \(cgImage.width)x\(cgImage.height)")

let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
let request = VNGenerateForegroundInstanceMaskRequest()
do {
    try handler.perform([request])
} catch {
    fail("Vision gagal: \(error.localizedDescription)")
}

guard let observation = request.results?.first, !observation.allInstances.isEmpty else {
    fail("tidak ada objek yang terdeteksi")
}

var chosen = observation.allInstances
if mode == "largest" {
    var bestIndex = observation.allInstances.first!
    var bestArea = 0
    for index in observation.allInstances {
        guard let buffer = try? observation.generateMaskedImage(
            ofInstances: IndexSet(integer: index), from: handler, croppedToInstancesExtent: true
        ) else { continue }
        let area = Int(CIImage(cvPixelBuffer: buffer).extent.width * CIImage(cvPixelBuffer: buffer).extent.height)
        print("  instance \(index): bbox \(area) px²")
        if area > bestArea { bestArea = area; bestIndex = index }
    }
    chosen = IndexSet(integer: bestIndex)
    print("  dipilih instance \(bestIndex)")
}

let masked = try observation.generateMaskedImage(
    ofInstances: chosen, from: handler, croppedToInstancesExtent: true
)
let ciImage = CIImage(cvPixelBuffer: masked)
let context = CIContext(options: nil)
guard let output = context.createCGImage(ciImage, from: ciImage.extent) else {
    fail("gagal membuat gambar hasil")
}
guard let destination = CGImageDestinationCreateWithURL(outURL as CFURL, UTType.png.identifier as CFString, 1, nil) else {
    fail("gagal menyiapkan \(outURL.path)")
}
CGImageDestinationAddImage(destination, output, nil)
guard CGImageDestinationFinalize(destination) else { fail("gagal menulis PNG") }
print("output \(output.width)x\(output.height) → \(outURL.lastPathComponent)")
