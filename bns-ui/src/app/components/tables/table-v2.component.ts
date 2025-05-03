import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ContextButtonComponent } from '../buttons/context/context-button.component';

export type ColumnDefinitions<TData> = ColumnDefinition<TData>[];
// Column definition for the new table
interface ColumnDefinition<TData> {
  name: keyof TData;
  title: string;
}

@Component({
  selector: 'app-table-v2',
  imports: [MatIconModule, ContextButtonComponent],
  template: ` <div class="w-full h-3/4 overflow-y-auto">
    <table class="w-full">
      <!-- <caption
      class="min-h-10 p-1 flex justify-between shadow-md mb-2 rounded-t-lg">
       Content inside the caption which could bbe anything? 
    </caption> -->
      <thead class="sticky bg-primary-dark rounded-sm">
        @if (columns(); as columns) {
          <tr class="divide-x divide-primary shadow-b shadow-sm">
            @for (column of columns; track column.name) {
              <th class="pb-4 pt-1" scope="col">{{ column.title }}</th>
            }
            @if (useExpand()) {
              <th class="expand"></th>
            }
          </tr>
        }
      </thead>
      <tbody>
        @if (items(); as items) {
          @for (item of items; track $index) {
            <tr [class]="'shadow-sm ' + (useExpand() && 'expand')">
              @if (columns(); as columns) {
                @for (column of columns; track $index) {
                  <!-- If the field is a boolean, we will want to  -->
                  @if (isBoolean(item[column.name])) {
                    <td
                      [class]="
                        item[column.name] === true
                          ? 'text-primary-green'
                          : 'text-red-400'
                      "
                      class="p-4">
                      <mat-icon
                        [fontIcon]="
                          item[column.name] === true ? 'check_circle' : 'cancel'
                        " />
                    </td>
                  } @else {
                    <td class="p-4">{{ item[column.name] }}</td>
                  }
                }
              }

              @if (useExpand()) {
                <td>
                  <div class="text-primary-dark flex justify-center">
                    <context-button
                      [options]="[]"
                      contextIcon="more_vert"></context-button>
                  </div>
                </td>
              }
            </tr>
          }
        }
      </tbody>
    </table>
    <div></div>
  </div>`,
  styleUrl: 'table-v2.component.scss',
})
export class TableComponentV2<TData> {
  columns = input.required<ColumnDefinitions<TData>>();
  items = input.required<TData[]>();

  useExpand = input<boolean>(false);

  isBoolean(field: any) {
    return field === true || field === false;
  }
}
