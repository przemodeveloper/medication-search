export interface Row {
  brand_name: string;
  purpose: string;
  product_type: string;
  manufacturer_name: string;
  id: string;
  product_ndc: string;
}

export interface RootResult {
  meta: Meta;
  results: Result[];
}

export interface Result {
  spl_product_data_elements: string[];
  active_ingredient?: string[];
  purpose?: string[];
  indications_and_usage: string[];
  warnings: string[];
  do_not_use?: string[];
  ask_doctor?: string[];
  ask_doctor_or_pharmacist?: string[];
  stop_use?: string[];
  pregnancy_or_breast_feeding?: string[];
  keep_out_of_reach_of_children?: string[];
  dosage_and_administration: string[];
  storage_and_handling?: string[];
  inactive_ingredient?: string[];
  questions?: string[];
  package_label_principal_display_panel: string[];
  set_id: string;
  id: string;
  effective_time: string;
  version: string;
  openfda: Openfda;
  spl_unclassified_section?: string[];
  active_ingredient_table?: string[];
  purpose_table?: string[];
  other_safety_information?: string[];
  description?: string[];
  clinical_pharmacology?: string[];
  pharmacokinetics?: string[];
  contraindications?: string[];
  precautions?: string[];
  general_precautions?: string[];
  information_for_patients?: string[];
  laboratory_tests?: string[];
  drug_interactions?: string[];
  drug_and_or_laboratory_test_interactions?: string[];
  carcinogenesis_and_mutagenesis_and_impairment_of_fertility?: string[];
  pregnancy?: string[];
  teratogenic_effects?: string[];
  nonteratogenic_effects?: string[];
  labor_and_delivery?: string[];
  nursing_mothers?: string[];
  pediatric_use?: string[];
  adverse_reactions?: string[];
  adverse_reactions_table?: string[];
  drug_abuse_and_dependence?: string[];
  overdosage?: string[];
  how_supplied?: string[];
}

interface Openfda {
  application_number: string[];
  brand_name: string[];
  generic_name: string[];
  manufacturer_name: string[];
  product_ndc: string[];
  product_type: string[];
  route: string[];
  substance_name: string[];
  rxcui: string[];
  spl_id: string[];
  spl_set_id: string[];
  package_ndc: string[];
  is_original_packager?: boolean[];
  nui: string[];
  pharm_class_moa: string[];
  pharm_class_pe: string[];
  pharm_class_cs: string[];
  pharm_class_epc: string[];
  unii: string[];
  upc?: string[];
  original_packager_product_ndc?: string[];
}

interface Meta {
  disclaimer: string;
  terms: string;
  license: string;
  last_updated: string;
  results: Results;
}

interface Results {
  skip: number;
  limit: number;
  total: number;
}
