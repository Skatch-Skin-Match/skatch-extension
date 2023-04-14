import { MouseEvent, ReactNode } from "react";

export const MessageType = {
  SUCCESS: "success",
  ERROR: "error",
} as const;
type MessageType = typeof MessageType[keyof typeof MessageType];

export interface AlertProps {
  type: MessageType;
  message: string;
  actionIcon?: ReactNode;
  onAction?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

export interface Message {
  id: string;
  type: MessageType;
  title: string;
  message?: string;
}

export interface AlertState {
  messages: Message[];
  noOfMessages: number;
}

export const AlertActionKind = {
  ADD_SUCCESS: "ADD_SUCCESS",
  ADD_ERROR: "ADD_ERROR",
  REMOVE_MESSAGE: "REMOVE_MESSAGE",
} as const;
type AlertActionKind = typeof AlertActionKind[keyof typeof AlertActionKind];

export interface AlertAction {
  type: AlertActionKind;
  payload?: any;
}

export interface AlertContext {
  state: AlertState;
  addSuccessMessage: (data: any) => void;
  addErrorMessage: (data: any) => void;
  removeMessage: (id: any) => void;
}
