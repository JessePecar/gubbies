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
    base: 'disabled:opacity-50 disabled:cursor-default flex px-2',
    color: {
      primary: {
        outline:
          'hoverable text-primary bg-transparent outline-1 outline-gray-200 rounded-lg',
        raised:
          'hoverable text-primary disabled:opacity-50 outline-1 bg-primary-green rounded-lg',
        text: 'flex hover:underline text-primary',
        default: 'hoverable flex rounded hover:underline text-primary',
      },
      secondary: {
        outline:
          'hoverable text-primary bg-transparent outline-1 outline-purple-400 rounded-lg',
        raised:
          'hoverable text-primary disabled:opacity-50 outline-1 bg-stone-200 rounded-lg',
        text: 'flex hover:underline text-purple-400 text-primary',
        default: 'hoverable flex rounded hover:underline text-primary',
      },
    },
    content: {
      'min-content': '',
      full: 'w-full justify-start',
      'full-center': 'w-full justify-center',
    },
  };
}
