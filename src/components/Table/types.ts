import { UserWithValidations } from "../../utils/types";

export interface TableProps {
  data: UserWithValidations[];
  isLoading: boolean;
  isLoaded: boolean;
}