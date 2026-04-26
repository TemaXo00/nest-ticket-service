import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import EventsPage from "@/pages/EventsPage.vue";
import { useUserStore } from "@/stores/user.store";
import EventDetailPage from "@/pages/EventDetailPage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import AdminEventsPage from "@/pages/AdminEventsPage.vue";
import AdminTicketsPage from "@/pages/AdminTicketsPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
      meta: {
        title: 'Home',
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: {
        title: 'Login',
      }
    },
    {
      path: '/events',
      name: 'Events',
      component: EventsPage,
      meta: {
        title: 'Events',
        requiresAuth: true,
      }
    },
    {
      path: '/events/:id',
      name: 'EventDetail',
      component: EventDetailPage,
      meta: {
        title: 'Event Details',
        requiresAuth: true,
      }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminPage,
      meta: {
        title: 'Admin Panel',
        requiresAuth: true,
        requiresAdmin: true,
      }
    },
    {
      path: '/admin/events',
      name: 'AdminEvents',
      component: AdminEventsPage,
      meta: {
        title: 'Manage Events',
        requiresAuth: true,
        requiresAdmin: true,
      }
    },
    {
      path: '/admin/tickets/:event_id',
      name: 'AdminTickets',
      component: AdminTicketsPage,
      meta: {
        title: 'Event Tickets',
        requiresAuth: true,
        requiresAdmin: true,
      }
    }
  ],
});

router.beforeEach((to) => {
  const baseTitle = 'Ticket Service';
  if (to.meta.title) {
    document.title = `${to.meta.title} - ${baseTitle}`;
  }

  const store = useUserStore();
  const requiresAuth = to.meta.requiresAuth;
  const requiresAdmin = to.meta.requiresAdmin;

  if (requiresAuth && !store.user_id) {
    return '/login';
  }

  if (requiresAdmin && store.user_id !== 'admin') {
    return '/';
  }

  return true;
});

export default router;
