import {
  Brain,
  Dna,
  BarChart3,
  Microscope,
  BookOpen,
} from 'lucide-react'

export const services = [
  {
    id: 'ai-data-science',
    title: 'AI & Data Science',
    icon: Brain,
    color: 'blue',
    shortDescription:
      'Leveraging machine learning, deep learning, and advanced analytics to extract actionable insights from complex datasets.',
    fullDescription:
      'We build intelligent systems and predictive models that transform raw data into strategic value. From computer vision pipelines to natural language processing solutions, our AI expertise spans the full spectrum of modern data science — tailored to life sciences and healthcare contexts.',
    problemsSolved:
      'Unstructured data overload, lack of predictive capability, manual pattern detection bottlenecks, and need for automated decision-support systems.',
    targetAudience:
      'Pharma R&D teams, biotech startups building data products, healthcare organizations seeking AI-driven insights, and research groups needing advanced analytics.',
    subServices: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Natural Language Processing',
      'Predictive Modeling & Analytics',
      'Pattern Recognition',
      'Big Data Analytics',
      'Data Mining',
      'Data Cleaning & Processing',
      'Data Visualization',
    ],
  },
  {
    id: 'computational-biology',
    title: 'Computational Biology & Bioinformatics',
    icon: Dna,
    color: 'teal',
    shortDescription:
      'Applying computational methods to decode biological complexity — from genome-scale analyses to molecular simulations.',
    fullDescription:
      'Our computational biology practice bridges the gap between raw biological data and meaningful discovery. We specialize in multi-omics integration, structural bioinformatics, and systems-level modeling to support drug discovery, biomarker identification, and fundamental research.',
    problemsSolved:
      'Interpreting high-throughput sequencing data, understanding protein structure-function relationships, integrating multi-omics datasets, and modeling complex biological systems.',
    targetAudience:
      'Genomics labs, pharmaceutical companies in target discovery, academic research groups, and biotech firms developing precision medicine solutions.',
    subServices: [
      'Genomics',
      'Transcriptomics',
      'Proteomics',
      'Metabolomics',
      'Structural Bioinformatics',
      'Systems Biology',
      'Molecular Modeling & Simulation',
      'Comparative Genomics',
      'Gene & Protein Expression Analysis',
    ],
  },
  {
    id: 'biostatistics',
    title: 'Biostatistics & Medical Statistics',
    icon: BarChart3,
    color: 'indigo',
    shortDescription:
      'Rigorous statistical design and analysis for clinical studies, experimental research, and evidence-based decision-making.',
    fullDescription:
      'We provide end-to-end statistical support — from study design and power analysis through data modeling and interpretation. Our expertise in STATA and R ensures robust, reproducible analyses that meet regulatory and publication standards.',
    problemsSolved:
      'Poorly designed experiments, underpowered studies, complex clinical data requiring advanced statistical methods, and need for regulatory-grade statistical reporting.',
    targetAudience:
      'Clinical research organizations, academic medical centers, pharmaceutical companies running trials, and public health researchers.',
    subServices: [
      'Statistical Modeling',
      'Clinical Data Analysis',
      'Experimental Design',
      'STATA-based Analysis',
      'R-based Analysis',
      'Biostatistics',
      'Medical Statistics',
    ],
  },
  {
    id: 'life-sciences',
    title: 'Life Sciences & Biomedical Research',
    icon: Microscope,
    color: 'green',
    shortDescription:
      'Deep domain expertise spanning molecular biology, cell biology, microbiology, and emerging fields like synthetic biology and nanobiotechnology.',
    fullDescription:
      'Our life sciences practice covers the full breadth of biomedical research — from fundamental cell biology and microbiology to cutting-edge fields like gene editing, stem cell research, and tissue engineering. We support both wet-lab and computational research workflows.',
    problemsSolved:
      'Navigating complex biological systems, designing biomarker discovery pipelines, integrating computational and experimental approaches, and addressing interdisciplinary research challenges.',
    targetAudience:
      'Academic research labs, biotech R&D departments, pharmaceutical preclinical teams, and healthcare innovation groups.',
    subServices: [
      'Molecular Biology',
      'Microbiology & Virology',
      'Cell Biology & Cell Culture',
      'Biomarker Discovery',
      'Tissue Engineering',
      'Stem Cell Research',
      'Synthetic Biology',
      'Nanobiotechnology',
    ],
  },
  {
    id: 'research-support',
    title: 'Research Support & Scientific Consulting',
    icon: BookOpen,
    color: 'amber',
    shortDescription:
      'Comprehensive research support — from literature review and scientific writing to data visualization and AI-driven research strategy.',
    fullDescription:
      'We act as an extension of your research team, providing literature review, manuscript preparation, data plot generation, and strategic consulting. Our AI-driven research solutions help accelerate discovery timelines and improve research quality.',
    problemsSolved:
      'Time-intensive literature reviews, need for publication-quality figures, research methodology gaps, and desire to integrate AI into existing research workflows.',
    targetAudience:
      'Academic researchers, graduate students, principal investigators, pharmaceutical medical affairs teams, and research-stage startups.',
    subServices: [
      'Literature Review',
      'Research Writing',
      'Data Plots & Visualization',
      'Scientific Consulting',
      'AI-driven Research Solutions',
    ],
  },
]
