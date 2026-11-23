---
schema: zora-designer/v1
documentKind: configuration
status: resolved-with-gaps
language: en
source:
  mode: template
  inputs:
    - "Locked desktop original: 05 Acquisition.png, SHA-256 e1b4dbea17915d3110bc2ec33380413a3edd2a8d786cf5ff7768078e244e39aa"
    - "Annotated desktop mapping: SHA-256 1911e1449f4ac4da6e4e32a6729a1eb526407990ba31b57fa077e051a54adc9a"
    - "Native mobile structure proposal: SHA-256 4249246afd95a3cdb6160807763e0eb84d3abaab03b56291446b5fb61268cff7"
  evidence:
    - id: acquisition-desktop-original
      kind: supplied locked design
      url: https://chatgpt.com/space/page_9a2ea3bae6d881918501e383b6b215ee
    - id: acquisition-desktop-annotated
      kind: supplied component mapping
      url: https://chatgpt.com/space/page_e6daf9ba2d448191b6c6abf0adeecb3e
    - id: acquisition-mobile-proposal
      kind: supplied structure proposal
      url: https://chatgpt.com/space/page_e6daf9ba2d448191b6c6abf0adeecb3e
config:
  category:
    value: business_productivity
    origin: user
  intent:
    value: "Company acquisition discovery, detail review, and next-step preparation without a live provider."
    origin: user
  platforms:
    value: [ios, android, web]
    origin: user
  viewport:
    value:
      compact: [390, 844]
      expanded: [1586, 992]
    origin: observed
  themes:
    value: [light, dark]
    origin: user
  primary:
    value: "#7C3AED"
    origin: derived
  harmony:
    value: analogous
    origin: derived
  navigator:
    value: "Stack list-to-detail routes with a responsive MasterDetail detail pane."
    origin: derived
derivation:
  provenance:
    contracts: 26.13.1
    navigator: 3.5.22
    runtime: 5.5.10
    zora: 27.9.0
  diagnostics:
    - "Published ZORA exposes serializable DataTable rich cells, controlled selection, and row activation."
    - "Published ZORA exposes direct-manifest Timeline items with image media markers."
    - "Published ZORA exposes MasterDetail as a direct manifest node with bounded independent panes and a host-owned compact active pane."
  assumptions:
    - "The compact MasterDetail pane remains master because the existing Stack topology owns list-to-detail routing; no route-state binding is invented."
    - "Company, contact, and history records are small deterministic local demo collections."
  unsupported:
    - "ZORA #1296 Select bold"
    - "ZORA #1292 branded Navigator rail"
  ownerRuntimeDrift:
    - owner: "@ankhorage/navigator"
      path: "reactive current-route and breakpoint-aware detail projection"
      decision: "Use the released Stack topology for compact list-to-detail only; desktop in-place active-company projection requires a published host-owned selection source and reactive detail-subtree binding."
tokens:
  light:
    source: "manifest acquisition theme; owner compilation required at downstream integration"
  dark:
    source: "manifest acquisition theme; owner compilation required at downstream integration"
components:
  supported:
    - Heading
    - Text
    - SearchInput
    - Select
    - Card
    - Badge
    - Button
    - Image
    - DatePicker
    - RadioGroup
    - DataTable
    - Timeline
    - MasterDetail
  gaps:
    - "Runtime/Navigator reactive active-company detail projection"
screens:
  - id: acquisition
    purpose: "Search and filter a company collection, then enter a demo company detail route."
    primaryAction: "Activate a company row without changing its controlled checkbox selection."
  - id: company-detail-wetzikon-technik
    purpose: "Review company basics, local contacts, history state and a next-step draft."
    primaryAction: "Back to companies"
assets:
  bundlePath: design-assets.json
  status: complete
  entries:
    - mediaId: acquisition-target
      role: icon
      sourcePath: assets/images/svg/acquisition-target.svg
      provenance: "Repository-authored generic acquisition mark; no company logo is implied."
      usages:
        - acquisition mark
        - company detail images
        - ordered Timeline markers
validation:
  scope: configuration
  gates:
    assetBundle: pass
    manifestDraft: pass
    release: blocked
  blockers:
    - "ZORA #1296"
    - "ZORA #1292"
findings: []
risks:
  - "No desktop or native rendered visual acceptance has been run."
openDecisions: []
userNotes:
  - "No Zefix credentials, CRM backend, persistence provider, or second mobile configuration."
---

# Acquisition design record

This is design evidence only. `createAppManifest.ts` remains the runtime authority.
