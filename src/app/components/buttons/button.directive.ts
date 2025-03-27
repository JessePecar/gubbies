import { Directive, effect, ElementRef, inject, input } from '@angular/core';
import {
  ButtonColor,
  ButtonContent,
  ButtonStyle,
  ButtonType,
} from './button.types';

@Directive({
  selector: '[button]',
})
export class ButtonDirective {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  public readonly color = input<ButtonColor>('primary');
  public readonly variant = input<ButtonType>('default');
  public readonly contentType = input<ButtonContent>('min-content');

  constructor() {
    effect(() => {
      var color = this.color();
      var variant = this.variant();
      var contentType = this.contentType();

      var buttonStyles = this.getButtonStyles(color, variant, contentType);

      this.elementRef.nativeElement.className = buttonStyles;
    });
  }

  private getButtonStyles(
    color: ButtonColor,
    variant: ButtonType,
    contentType: ButtonContent
  ) {
    var baseStyle = this.buttonType.base;
    var buttonStyle = this.buttonType.color[color][variant];
    var contentStyle = this.buttonType.content[contentType];

    return `${baseStyle} ${buttonStyle} ${contentStyle}`;
  }

  private readonly buttonType: ButtonStyle = {
    base: 'disabled:opacity-50 disabled:cursor-default flex justify-center',
    color: {
      primary: {
        outline:
          'button text-stone-200 bg-transparent outline-1 outline-gray-200 rounded-lg',
        raised:
          'button text-stone-900 disabled:opacity-50 outline-1 bg-purple-400 rounded-lg enabled:hover:bg-purple-500',
        text: 'flex hover:underline',
        default: 'button flex rounded hover:underline',
      },
      secondary: {
        outline:
          'button text-stone-200 bg-transparent outline-1 outline-purple-400 rounded-lg',
        raised:
          'button text-stone-900 disabled:opacity-50 outline-1 bg-stone-200 rounded-lg',
        text: 'flex hover:underline text-purple-400',
        default: 'button flex rounded hover:underline',
      },
    },
    content: {
      'min-content': '',
      full: 'w-full',
    },
  };
}
