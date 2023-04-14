import { createContext, FC, ReactNode, useReducer } from "react";
import Alert from "./index";
import { AlertAction, AlertActionKind, AlertContext, AlertState } from "./interfaces";

export const AlertMessengerContext = createContext<AlertContext>({} as AlertContext);

const AlertReducer = (state: AlertState, action: AlertAction) => {
  switch (action.type) {
    case AlertActionKind.ADD_SUCCESS:
      return {
        ...state,
        messages: [{ type: "success", ...action.payload }, ...state.messages].slice(
          0,
          state.noOfMessages,
        ),
      };
    case AlertActionKind.ADD_ERROR:
      return {
        ...state,
        messages: [{ type: "error", ...action.payload }, ...state.messages].slice(
          0,
          state.noOfMessages,
        ),
      };
    case AlertActionKind.REMOVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((message) => message.id !== action.payload.id),
      };
  }
};

export const AlertContextProvider: FC<{
  children: ReactNode;
  noOfMessages?: number;
  autoHideTimeout?: number;
  autoHideError?: boolean;
}> = ({ children, noOfMessages = 1, autoHideTimeout = 1000, autoHideError = false }) => {
  const [state, dispatch] = useReducer(AlertReducer, { messages: [], noOfMessages });
  const addSuccessMessage = (data: any) => {
    const id = Date.now();
    dispatch({ type: AlertActionKind.ADD_SUCCESS, payload: { id, ...data } });
    setTimeout(() => {
      dispatch({ type: AlertActionKind.REMOVE_MESSAGE, payload: { id } });
    }, autoHideTimeout);
  };
  [dispatch, autoHideTimeout];

  const addErrorMessage = (data: any) => {
    const id = Date.now();
    dispatch({ type: AlertActionKind.ADD_ERROR, payload: { id, ...data } });
    if (autoHideError) {
      setTimeout(() => {
        dispatch({ type: AlertActionKind.REMOVE_MESSAGE, payload: { id } });
      }, autoHideTimeout);
    }
  };
  [dispatch, autoHideError, autoHideTimeout];

  const removeMessage = (id: number) => {
    dispatch({ type: AlertActionKind.REMOVE_MESSAGE, payload: { id } });
  };
  [dispatch];

  return (
    <AlertMessengerContext.Provider
      value={{ state, addSuccessMessage, addErrorMessage, removeMessage }}
    >
      {children}
      <div className="toast-center z-[100]">
        {state.messages.map(({ type, message, id }) => (
          <Alert
            type={type}
            key={`alert__message__${id}`}
            message={message}
            onAction={() => removeMessage(id)}
          />
        ))}
      </div>
    </AlertMessengerContext.Provider>
  );
};