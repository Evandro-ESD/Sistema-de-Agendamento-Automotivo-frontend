export interface DropdownMenuItem {
  label: string;
  route?: string;
  children?: DropdownMenuItem[];
  icon?: string;
}
