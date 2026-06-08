export interface UrbanWaterMonitorCardContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

export interface UrbanWaterMonitorSectionContent {
  readonly title: string;
  readonly description: string;
  readonly cards: readonly UrbanWaterMonitorCardContent[];
}

export const urbanWaterMonitorProjectContent = {
  eyebrow: 'Project',
  title: 'Urban Water Monitor',
  description:
    'Event-based monitoring for urban water quality, field campaigns, and stakeholder communication.',
  sections: [
    {
      title: 'Product Vision',
      description:
        'Urban Water Monitor is an event-based monitoring and campaign-management app for urban water quality. It connects weather events, hydrological context, sampling workflows, passive samplers, lab results, infrastructure assets, and stakeholder communication.',
      cards: [
        {
          eyebrow: 'Purpose',
          title: 'Plan and explain monitoring campaigns',
          description:
            'Help teams decide where and when monitoring is most useful, document field work properly, and explain findings to different audiences.',
        },
        {
          eyebrow: 'Scope',
          title: 'Context plus verified evidence',
          description:
            'Connect public environmental data with field monitoring workflows, professional sampling, passive sampler campaigns, lab results, and clear communication.',
        },
      ],
    },
    {
      title: 'Problem',
      description:
        'Urban water quality is difficult to monitor because relevant pollution often appears during short, dynamic events. A single sample can miss the most important moment.',
      cards: [
        {
          eyebrow: 'Event peaks',
          title: 'Short windows matter',
          description:
            'Rainfall, runoff, traffic surfaces, combined sewer overflows, infrastructure, land use, and seasonal conditions can influence what enters a water body.',
        },
        {
          eyebrow: 'Interpretation',
          title: 'Sampling needs context',
          description:
            'Sampling without event context is hard to interpret, lab results often arrive later, and stakeholders need different levels of detail.',
        },
      ],
    },
    {
      title: 'Core Idea',
      description:
        'The app should become an operating system for urban water monitoring by combining live context data, plans, observations, sampling tasks, passive sampler deployments, laboratory results, and communication layers.',
      cards: [
        {
          eyebrow: 'Question',
          title: 'Where, when, and why should we monitor?',
          description:
            'Identify event windows worth sampling, guide field teams through documented workflows, and link every sample to time, place, weather, hydrology, and method.',
        },
        {
          eyebrow: 'Views',
          title: 'Role-specific interpretation',
          description:
            'Turn complex monitoring records into views for researchers, authorities, municipalities, utilities, NGOs, field teams, and public-interest audiences.',
        },
      ],
    },
    {
      title: 'Data Sources and API Integrations',
      description:
        'Urban Water Monitor is designed around a concrete integration strategy. Public APIs provide context, while field and lab workflows provide monitoring evidence.',
      cards: [
        {
          eyebrow: 'Official production APIs',
          title: 'Weather, radar, geodata, and catalogue sources',
          description:
            'Use MeteoSwiss Open Data via data.geo.admin.ch STAC for rainfall, weather station context, and radar precipitation; use geo.admin.ch / Federal Spatial Data Infrastructure for map layers, feature lookup, and spatial context; use the opendata.swiss CKAN API for dataset discovery and source provenance.',
        },
        {
          eyebrow: 'Regional open data',
          title: 'Cantonal and municipal resources',
          description:
            'Support station metadata, hydrometric datasets, WFS, WMS, CSV, GeoPackage, and SHP resources as optional regional connectors, starting with structured imports where available.',
        },
        {
          eyebrow: 'Prototype-only APIs',
          title: 'Fast demos without production claims',
          description:
            'Existenz.ch Hydro and SwissMetNet JSON APIs can accelerate prototypes, but must be marked prototype-only and must not become the source of truth for verified monitoring decisions.',
        },
        {
          eyebrow: 'Internal field and lab data',
          title: 'App-owned monitoring evidence',
          description:
            'Campaigns, monitoring locations, rain events, sampling tasks, samples, passive samplers, field observations, photos, lab results, QA/QC flags, pollutants, reports, and stakeholder notes are internal app data.',
        },
        {
          eyebrow: 'Future standards',
          title: 'Interoperability path',
          description:
            'OGC SensorThings API can support future sensor interoperability, and OGC WaterML 2.0 can support future hydrological time-series exchange.',
        },
        {
          eyebrow: 'Trust label',
          title: 'Context is not confirmation',
          description:
            'External context data supports decisions. Verified field and lab records provide monitoring evidence. Modelled risk scores are decision-support indicators, not confirmed pollution measurements.',
        },
      ],
    },
    {
      title: 'Monitoring Workflow',
      description:
        'The app should support professional monitoring campaigns from planning to interpretation.',
      cards: [
        {
          eyebrow: 'Plan',
          title: 'Define the campaign',
          description:
            'Define objectives, select locations and catchments, define event triggers, assign sampling tasks, and prepare field checklists.',
        },
        {
          eyebrow: 'Document',
          title: 'Capture field and lab records',
          description:
            'Deploy passive samplers or collect grab and composite samples, register samples with QR codes, document field conditions, import laboratory results, and add QA/QC notes.',
        },
        {
          eyebrow: 'Interpret',
          title: 'Report with event context',
          description:
            'Validate data, interpret results in event context, and generate stakeholder-specific reports.',
        },
      ],
    },
    {
      title: 'App Modules',
      description:
        'The complete app can grow into several planned product areas after this first Project screen.',
      cards: [
        {
          eyebrow: 'Operations',
          title: 'Monitoring and field work',
          description:
            'Map Dashboard, Event Timeline, Sampling Planner, Passive Sampler Manager, Lab Result Import, Reports and Exports.',
        },
        {
          eyebrow: 'Knowledge',
          title: 'Context and interpretation',
          description:
            'Pollutant Library, Risk Scoring, Blue-Green Infrastructure Monitor, Citizen Observations, Stakeholder Portal, Admin and Permissions.',
        },
      ],
    },
    {
      title: 'Stakeholder Views',
      description:
        'Different users need different levels of detail, so the app should support role-specific views instead of showing the same dashboard to everyone.',
      cards: [
        {
          eyebrow: 'Technical',
          title: 'Research, utility, field, and admin views',
          description:
            'Research View for raw data, methods, uncertainty, QA/QC, and exports; Utility View for early warning context and stations; Field Team View for tasks, QR codes, photos, and sample status; Admin View for users, permissions, and data sources.',
        },
        {
          eyebrow: 'Decision and public',
          title: 'Municipality and public views',
          description:
            'Municipality View focuses on hotspots, infrastructure, actions, and summaries. Public View uses simple explanations, status, observations, and education.',
        },
      ],
    },
    {
      title: 'Risk and Event Logic',
      description:
        'The app should include transparent event and risk logic. Risk scores should help prioritize monitoring, not present absolute truth.',
      cards: [
        {
          eyebrow: 'Factors',
          title: 'Event signals',
          description:
            'Rain intensity, dry period before rainfall, runoff potential, traffic or sealed surface influence, hydrological response, nearby infrastructure, previous observations, and lab result trends.',
        },
        {
          eyebrow: 'Rule',
          title: 'Decision-support indicator',
          description:
            'Risk scores are decision-support indicators, not verified pollution measurements.',
        },
      ],
    },
    {
      title: 'Blue-Green Infrastructure',
      description:
        'The app should help track blue-green infrastructure and its potential role in reducing runoff, delaying peaks, improving infiltration, or supporting treatment.',
      cards: [
        {
          eyebrow: 'Assets',
          title: 'Mitigation inventory',
          description:
            'Retention basins, infiltration areas, green roofs, constructed wetlands, rain gardens, permeable surfaces, swales, and sponge-city elements.',
        },
        {
          eyebrow: 'Fields',
          title: 'Monitoring connection',
          description:
            'Track asset type, location, catchment, design capacity, maintenance status, related monitoring stations, before/after event comparison, photos, and inspections.',
        },
      ],
    },
    {
      title: 'Pollutant Library',
      description:
        'The app should contain a structured pollutant library that explains relevant pollutant groups and how they relate to urban water systems.',
      cards: [
        {
          eyebrow: 'Metadata',
          title: 'Searchable substance context',
          description:
            'Store name, substance group, CAS number where applicable, sources, pathways, measurement method, detection limits, quality criteria, ecotoxicological relevance, persistence, transformation products, and public explanation.',
        },
        {
          eyebrow: 'Groups',
          title: 'Relevant pollutant groups',
          description:
            'PFAS, pesticides, biocides, pharmaceuticals, tire-wear related compounds, heavy metals, nutrients, microplastics, and organic micropollutants.',
        },
      ],
    },
    {
      title: 'Data Trust and Communication',
      description:
        'The app must clearly communicate data trust levels. A field observation is not the same as a laboratory-confirmed result, and a modelled risk score is not a measured concentration.',
      cards: [
        {
          eyebrow: 'Trust levels',
          title: 'Separate evidence types',
          description:
            'Public open data, field observation, sensor measurement, laboratory result, modelled estimate, and expert-reviewed interpretation must remain distinct.',
        },
        {
          eyebrow: 'Communication',
          title: 'Useful without false certainty',
          description:
            'Avoid false certainty, show uncertainty where relevant, explain what is known and unknown, separate raw data from interpretation, and keep public communication understandable and non-alarmist.',
        },
      ],
    },
    {
      title: 'MVP Scope',
      description:
        'The first useful MVP should focus on event context and monitoring workflow, not on measuring every pollutant live.',
      cards: [
        {
          eyebrow: 'Included',
          title: 'Realistic first product surface',
          description:
            'Project overview, map with monitoring locations, mock hydrology stations, mock rain events, event timeline, sampling planner, passive sampler records, lab result import placeholder, pollutant library starter, stakeholder placeholders, and role-based navigation structure.',
        },
        {
          eyebrow: 'Excluded',
          title: 'No unsupported claims',
          description:
            'Real-time measurement of complex micropollutants, automated regulatory decisions, public alarm systems, unverified pollution claims, and attribution to external inspiration sources are out of scope.',
        },
      ],
    },
    {
      title: 'Future Screens',
      description:
        'The first template iteration only adds the Project screen. Future issues should define the operational screens.',
      cards: [
        {
          eyebrow: 'Planned',
          title: 'Operational navigation later',
          description:
            'Dashboard, Map, Events, Monitoring Campaigns, Samples, Passive Samplers, Lab Results, Pollutant Library, Infrastructure, Observations, Reports, Stakeholders, and Settings.',
        },
      ],
    },
  ],
} as const;
