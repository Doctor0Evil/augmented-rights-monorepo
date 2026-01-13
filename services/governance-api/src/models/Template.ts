export interface Template {
  id: string;
  code: string;
  version: string;
  uri: string;
}

export const inMemoryTemplates: Template[] = [
  {
    id: "templ-1",
    code: "NEURORIGHTS_V1",
    version: "1.0.0",
    uri: "https://example.org/templates/neurorights-v1.json"
  }
];
