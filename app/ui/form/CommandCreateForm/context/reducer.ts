import { CommandCreateFormData } from "../useCommandCreateForm";

export interface State {
  'MODAL_PREVIEW_COMMAND': boolean;
  'CURRENT_COMMAND'?: CommandCreateFormData
  'PENDING_COMMAND_REQUEST': boolean;
}

export type ModalPreviewStateAction = {
  type: 'MODAL_PREVIEW_COMMAND',
  payload: boolean;
}

export type CommandFormStateAction = {
  type: 'CURRENT_COMMAND',
  payload: CommandCreateFormData;
}

export type LoadingCommandStateAction = {
  type: 'PENDING_COMMAND_REQUEST',
  payload: boolean
}

export type Action = ModalPreviewStateAction | CommandFormStateAction | LoadingCommandStateAction;

export const redcuer = (state: State, action: Action) => {
  return { ...state, [action.type]: action.payload }
}

export const initialState: State = {
  MODAL_PREVIEW_COMMAND: false,
  CURRENT_COMMAND: undefined,
  PENDING_COMMAND_REQUEST: false,
}