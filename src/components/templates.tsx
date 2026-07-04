import { selectTemplateById, selectTemplates } from "@/lib/db";

export function SelectTemplates() {
  return selectTemplates();
}

export function getTemplateById(id: string) {
  return selectTemplateById(id);
}
