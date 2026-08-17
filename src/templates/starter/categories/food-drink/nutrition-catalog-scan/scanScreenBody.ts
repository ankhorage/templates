import { createZoraNode, type ZoraNode } from '../../../../shared';

export function createNutritionScanBody(idPrefix: string): ZoraNode[] {
  return [
    createZoraNode(`${idPrefix}-scan-scanner`, 'BarcodeScannerView', {
      permissionStatus: 'unknown',
      title: 'Scan product barcode',
      description: 'Point the camera at a barcode to look up or add a product.',
      overlayTitle: 'Align barcode',
      overlayDescription: 'Hold the barcode inside the frame. Scanning starts automatically.',
      cornerLabel: 'EAN',
      requestPermissionLabel: 'Allow camera access',
      manualEntryLabel: 'Enter barcode manually',
    }),
    createZoraNode(`${idPrefix}-scan-lookup-notice`, 'Notice', {
      title: 'Lookup behavior',
      description:
        'GET /products/by-barcode/:barcode opens product detail on 200, opens create with a prefilled barcode on 404, and surfaces retry messaging for invalid input or backend unavailability.',
    }),
  ];
}
