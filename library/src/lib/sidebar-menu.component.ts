import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MenuItemAnchorService } from './internal/menu-item-anchor.service';
import { MenuItemNodeService } from './internal/menu-item-node.service';

import { Menu, UnAuthorizedVisibility } from './sidebar-menu.interface';
import { MenuItemRoleService, Role } from './internal/menu-item-role.service';
import { MenuSearchService } from './internal/menu-search.service';

@Component({
  selector: 'asm-angular-sidebar-menu',
  styleUrls: ['sidebar-menu.component.scss'],
  providers: [MenuItemNodeService, MenuItemAnchorService, MenuItemRoleService, MenuSearchService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ul class="asm-menu" [@.disabled]="disableAnimations">
    <ng-container *ngFor="let item of menu">
      <li asm-menu-item *ngIf="menuItemService.showItem$(item.roles) | async" [menuItem]="item" [level]="0"></li>
    </ng-container>
  </ul>`,
})
export class SidebarMenuComponent {
  @Input('menu') set _menu(menu: Menu) {
    this.disableAnimations = true;
    this.menu = menu;

    setTimeout(() => {
      this.disableAnimations = false;
    });
  }
  @Input() set iconClasses(cssClasses: string) {
    this.menuItemAnchorService.iconClasses = cssClasses;
  }
  @Input() set toggleIconClasses(cssClasses: string) {
    this.menuItemNodeService.toggleIconClasses = cssClasses;
  }
  @Input() set role(role: Role | undefined) {
    this.menuItemService.role = role;
  }
  @Input() set unAuthorizedVisibility(visibility: UnAuthorizedVisibility) {
    this.menuItemService.unAuthorizedVisibility = visibility;
  }
  @Input() set search(value: string | undefined) {
    this.menuSearchService.search = value;
  }

  menu?: Menu;
  disableAnimations = true;

  constructor(
    private menuItemAnchorService: MenuItemAnchorService,
    private menuItemNodeService: MenuItemNodeService,
    private menuSearchService: MenuSearchService,
    public menuItemService: MenuItemRoleService
  ) {}
}
