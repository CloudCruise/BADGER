// Base types
import { JSONSchema } from "json-schema-typed"

export interface Workflow {
  id: string;
  version_id: string;
  version_number: number;
  created_at: string;
  created_by: string;

  name: string;
  description: string | null;

  nodes: Node[];
  edges: Record<string, Edge>;

  input_schema: JSONSchema;
  output_schema: JSONSchema;

  workspace_id: string;
  use_native_actions: boolean;
  video_record_session: boolean;

  encrypted_keys: string[];
  popup_xpaths: string[];
  auth_urls: string[];

  error_codes: ErrorCode[];
}

export interface ErrorCode {
  code: string;
  description: string;
}

export enum ActionTypes {
  BoolCondition = "BOOL_CONDITION",
  Click = "CLICK",
  End = "END",
  ExtractDatamodel = "EXTRACT_DATAMODEL",
  FileDownload = "FILE_DOWNLOAD",
  FileUpload = "FILE_UPLOAD",
  InputSelect = "INPUT_SELECT",
  InputText = "INPUT_TEXT",
  Loop = "LOOP",
  Navigate = "NAVIGATE",
  Screenshot = "SCREENSHOT",
  Start = "START",
  TabManagement = "TAB_MANAGEMENT",
  Tfa = "TFA",
  UserInteraction = "USER_INTERACTION"
}

export interface Edge {
  false?: null | string
  loop_done?: null | string
  loop_not_done?: null | string
  to?: null | string
  true?: null | string
}

export type ExecutionType = "LLM_DOM" | "LLM_VISION" | "STATIC"

export type ComparisonType =
  | "EQUAL"
  | "NOT_EQUAL"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | "IS_NULL"
  | "IS_NOT_NULL"
  | "STARTS_WITH"
  | "ENDS_WITH"

export type TfaType = "SMS" | "EMAIL" | "AUTHENTICATOR"

export type TabAction = "CLOSE" | "OPEN" | "SWITCH"

export interface BaseNode {
  id: string
  name: string
  description?: string
  errored?: boolean
  previous_node_errored?: boolean
  use_native_actions?: boolean
  popup_xpaths?: string[]
  session_retries?: number
  session_id?: string
}

// Common interfaces
export interface HasSelector {
  selector?: string | null
  selector_error_message?: string
  wait_time?: number
}

export interface HasLLM {
  prompt?: string
  llm_model?: string
}

export interface IsInteractive {
  human_mode?: boolean
  end_here_on_dry_run?: boolean
}

// Node parameters
export interface BoolConditionParameters extends HasLLM {
  clear_cookies_on_false?: boolean
  comparison_operator?: ComparisonType
  comparison_value_1?: null | string
  comparison_value_2?: null | string
  condition?: string
  decision?: boolean
  error_on_false_message?: string
  execution: ExecutionType
}

export interface BoolConditionNode extends BaseNode {
  action: ActionTypes.BoolCondition
  parameters: BoolConditionParameters
}

export interface ClickParameters extends HasSelector, HasLLM, IsInteractive {
  execution: ExecutionType
  max_retries_with_reload?: number
}

export interface ClickNode extends BaseNode {
  action: ActionTypes.Click
  parameters: ClickParameters
}

export interface EndNode extends BaseNode {
  action: ActionTypes.End
}

export interface ExtractDatamodelNodeParameters extends HasSelector {
  execution?: ExecutionType
  extract_data_model?: JSONSchema
}

export interface ExtractDatamodelNode extends BaseNode {
  action: ActionTypes.ExtractDatamodel
  parameters: ExtractDatamodelNodeParameters
}

export interface FileDownloadParameters {
  continue_on_failed_download?: boolean
  metadata: { [key: string]: any }
  selector: string
}

export interface FileDownloadNode extends BaseNode {
  action: ActionTypes.FileDownload
  parameters: FileDownloadParameters
}

export interface FileUploadParameters {
  signed_file_url: string
}

export interface FileUploadNode extends BaseNode {
  action: ActionTypes.FileUpload
  parameters: FileUploadParameters
}

export interface InputSelectParameters
  extends HasSelector,
    HasLLM,
    IsInteractive {
  fuzzy_match?: boolean
  value?: string
  max_retries_with_reload?: number
}

export interface InputSelectNode extends BaseNode {
  action: ActionTypes.InputSelect
  parameters: InputSelectParameters
}

export interface InputTextParameters
  extends HasSelector,
    HasLLM,
    IsInteractive {
  do_not_clear?: boolean
  submit_after_input?: boolean
  text: string
  execution: ExecutionType
  max_retries_with_reload?: number
}

export interface InputTextNode extends BaseNode {
  action: ActionTypes.InputText
  parameters: InputTextParameters
}

export interface LoopParameters {
  current_index?: number
  current_item?:
    | any[]
    | boolean
    | number
    | { [key: string]: any }
    | null
    | string
  over?: any[] | boolean | number | { [key: string]: any } | null | string
  variable_current_index: string
  variable_current_item: string
  variable_over: string
}

export interface LoopNode extends BaseNode {
  action: ActionTypes.Loop
  parameters: LoopParameters
}

export interface NavigateParameters {
  url: string
}

export interface NavigateNode extends BaseNode {
  action: ActionTypes.Navigate
  parameters: NavigateParameters
}

export interface ScreenshotParameters extends HasSelector {
  margin?: number
  max_scrolls?: number
  wait_after_scroll?: number
}

export interface ScreenshotNode extends BaseNode {
  action: ActionTypes.Screenshot
  parameters: ScreenshotParameters
}

export interface StartParameters {
  input_variables?: { [key: string]: any }
  video_record_session?: boolean
  store_downloaded_files?: boolean
  popup_xpaths?: string[]
  url: string
}

export interface StartNode extends BaseNode {
  action: ActionTypes.Start
  parameters: StartParameters
}

export interface TfaParameters extends HasSelector {
  code?: string[] | null | string
  tfa_type: TfaType
}

export interface TfaNode extends BaseNode {
  action: ActionTypes.Tfa
  parameters: TfaParameters
}

export interface TabManagementParameters {
  tab_index?: number
  tabAction: TabAction
  url?: string
}

export interface TabManagementNode extends BaseNode {
  action: ActionTypes.TabManagement
  parameters: TabManagementParameters
}

export interface UserInteractionParameters {
  error_message?: string
  expected_datamodel: JSONSchema
  missing_properties?: string[]
  server_message?: string
  timeout?: number
}

export interface UserInteractionNode extends BaseNode {
  action: ActionTypes.UserInteraction
  parameters: UserInteractionParameters
}

export type Node =
  | BoolConditionNode
  | ClickNode
  | EndNode
  | ExtractDatamodelNode
  | FileDownloadNode
  | FileUploadNode
  | InputSelectNode
  | InputTextNode
  | LoopNode
  | NavigateNode
  | ScreenshotNode
  | StartNode
  | TabManagementNode
  | TfaNode
  | UserInteractionNode
