import React from "react";

/** Multi-line text input; same box treatment as Input, vertically resizable. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  help?: string;
  error?: string;
}
export function Textarea(props: TextareaProps): JSX.Element;
