export type ButtonType = 'default' | 'outline' | 'raised' | 'text';
export type ButtonColor = 'primary' | 'secondary';
export type ButtonContent = 'full' | 'min-content' | 'full-center';

export type ButtonStyle = {
  base: string;
  color: Record<ButtonColor, Record<ButtonType, string>>;
  content: Record<ButtonContent, string>;
};
