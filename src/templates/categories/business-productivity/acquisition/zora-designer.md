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
    - "Acquisition currently declares Zefix PublicREST search/UID operations in infra.apis with Basic credential reference zefix-credentials; no credential values."
    - "Acquisition selects Legend in-memory session state for controlled local selection; no persistence is claimed."
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
    - owner: "@ankhorage/contracts and @ankhorage/infra"
      path: "infra.environments.local.graphDatabase"
      decision: "Neo4j was explicitly selected for Acquisition graph persistence. The currently published InfraManifest has no graphDatabase capability, so do not serialize an unsupported Neo4j provider in the generated ankh.config.json. Existing graph and relational selections are separate; see ankhorage/infra#197."
    - owner: "@ankhorage/data-sources"
      path: "createZefixPublicRestApi"
      decision: "Published @ankhorage/data-sources 2.3.0 does not export the canonical descriptor. Draft data-sources#318 defines company-uid/company.get-by-uid with path parameter id, which differs from this manifest's company-by-uid/company.by-uid/uid contract. Do not import the PR branch or add an unpublished dependency. After publication, consume the released descriptor and prove infra.apis.zefix equals it."
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
    - "Infra #197: portable graphDatabase selection is not yet supported"
    - "Trusted server-side Zefix API execution is missing; Templates must not add a REST executor."
    - "A project-scoped Supabase Vault credential resolver is missing; the manifest retains only the zefix-credentials reference."
    - "A manifest-visible operation error state is missing; result fallback is not a user-rendered failure state."
    - "Reactive selected-company detail projection is missing from the published Runtime/Navigator boundary."
    - "Authenticated generated-application acceptance is missing; canonical Supabase auth currently gates the Acquisition routes."
findings: []
risks:
  - "No authenticated desktop or native rendered application acceptance has been run."
openDecisions: []
userNotes:
  - "Neo4j is the user-approved graph persistence provider for Acquisition; the Neo4j selection is pending a released graphDatabase Infra contract."
  - "Supabase Vault is the selected Secret Store; vendor credential ref zefix-credentials is declared but contains no secret payload. Neo4j credentials will use a distinct project-scoped Vault reference once graphDatabase is supported."
  - "No raw Zefix credentials, live CRM/graph connection, database provisioning, or second mobile configuration."
---

# Acquisition design record

This is design evidence only. `createAppManifest.ts` remains the runtime authority.
