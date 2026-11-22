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
    value: "Stack list to company-detail route; no desktop split projection is asserted."
    origin: derived
derivation:
  provenance:
    contracts: 26.13.1
    navigator: 3.5.22
    runtime: 5.5.10
    zora: 27.6.1
  diagnostics:
    - "DataTable has no serializable rich cells, selection, or activation event."
    - "Timeline and ListItem are not direct manifest nodes."
    - "Navigator split view is alpha/testing-only on iOS and unsupported on web and Android."
  assumptions:
    - "The mobile proposal is structural evidence only; native visual approval remains outstanding."
    - "Company, contact, and history records are small deterministic local demo collections."
  unsupported:
    - "ZORA #1307 rich selectable DataTable"
    - "ZORA #1308 Timeline manifest"
    - "ZORA #1309 responsive master-detail projection"
    - "ZORA #1296 Select bold"
    - "ZORA #1292 branded Navigator rail"
  ownerRuntimeDrift:
    - owner: "@ankhorage/zora"
      path: "DataTable"
      decision: "Use a MissingElement marker and a route-only demo detail entry; do not emulate a table."
    - owner: "@ankhorage/zora"
      path: "Timeline"
      decision: "Use a MissingElement marker; preserve event data without a fake timeline."
    - owner: "@ankhorage/navigator"
      path: "split-view"
      decision: "Use the released Stack topology for the portable list-to-detail route only."
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
  gaps:
    - MissingElement
screens:
  - id: acquisition
    purpose: "Search and filter a company collection, then enter a demo company detail route."
    primaryAction: "Open Wetzikon Technik AG"
  - id: company-detail
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
        - company detail image
validation:
  scope: configuration
  gates:
    assetBundle: pass
    manifestDraft: pass-with-blockers
    release: blocked
  blockers:
    - "ZORA #1307"
    - "ZORA #1308"
    - "ZORA #1309"
    - "ZORA #1296"
    - "ZORA #1292"
findings: []
risks:
  - "No desktop or native rendered visual acceptance has been run."
openDecisions:
  - "Replace MissingElement markers only after the named owner APIs are published and accepted."
userNotes:
  - "No Zefix credentials, CRM backend, persistence provider, or second mobile configuration."
---

# Acquisition design record

This is design evidence only. `createAppManifest.ts` remains the runtime authority.
