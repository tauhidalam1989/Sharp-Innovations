import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../../core/services/user.service';
import { User } from '../../../../../core/models/auth.model';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    users: User[] = [];
    loading = false;
    totalItems = 0;
    currentPage = 1;
    pageSize = 10;
    searchTerm = '';

    constructor(
        private userService: UserService,
        private router: Router,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.loading = true;
        this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
            next: (response) => {
                if (response.success) {
                    this.users = (response.result || response.data) as User[];
                    this.totalItems = response.pagination?.total || 0;
                }
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading users:', error);
                this.loading = false;
            }
        });
    }

    onSearch(): void {
        this.currentPage = 1;
        this.loadUsers();
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadUsers();
    }

    onPageSizeChange(event: any): void {
        this.pageSize = event.target.value;
        this.currentPage = 1;
        this.loadUsers();
    }

    createNew(): void {
        this.router.navigate(['/dashboard/users/new']);
    }

    editUser(id: number): void {
        this.router.navigate([`/dashboard/users/edit/${id}`]);
    }

    deleteUser(id: number): void {
        if (confirm('Are you sure you want to delete this user?')) {
            this.userService.deleteUser(id).subscribe({
                next: (response) => {
                    if (response.success) {
                        this.loadUsers();
                    }
                },
                error: (error) => {
                    console.error('Error deleting user:', error);
                }
            });
        }
    }

    toggleStatus(user: User): void {
        const action = user.isActive ? 'deactivate' : 'activate';
        if (confirm(`Are you sure you want to ${action} this user?`)) {
            this.userService.toggleStatus(user.id, !user.isActive).subscribe({
                next: (response) => {
                    if (response.success) {
                        user.isActive = !user.isActive;
                    }
                },
                error: (error) => {
                    console.error(`Error toggling user status:`, error);
                }
            });
        }
    }

    getTotalPages(): number {
        return Math.ceil(this.totalItems / this.pageSize);
    }

    canEdit(user: User): boolean {
        const currentUser = this.authService.getCurrentUser();
        if (!currentUser) return false;

        // Super admin can edit everyone
        if (currentUser.role === 'super_admin') return true;

        // Others can only edit themselves
        return currentUser.id === user.id;
    }
}
