// swagger-config.js
import { generateApi } from 'swagger-typescript-api';
import { resolve } from 'path';

generateApi({
  name: 'api.ts',
  output: resolve(process.cwd(), './src/api'),
  url: 'https://together-dallaem-api.vercel.app/openapi.json',
  extractRequestParams: true,
  extractRequestBody: true,
  modular: true,
  generateResponses: true,
  moduleNameFirstTag: true,
  httpClientType: 'axios',
  hooks: {
    onFormatRouteName: (routeInfo, templateRouteName) => {
      const method = routeInfo.method.toUpperCase();
      const path = routeInfo.route;
      const key = `${method}:${path}`;

      const customNames = {
        // Auth
        'POST:/{teamId}/auth/signup': 'signup',
        'POST:/{teamId}/auth/email-check': 'checkEmail',
        'POST:/{teamId}/auth/login': 'login',
        'POST:/{teamId}/auth/logout': 'logout',
        'POST:/{teamId}/auth/refresh': 'refreshToken',
        'POST:/{teamId}/oauth/{provider}': 'loginWithOAuth',

        // Users
        'GET:/{teamId}/users/me': 'getMyProfile',
        'PATCH:/{teamId}/users/me': 'updateMyProfile',
        'GET:/{teamId}/users/{userId}': 'getUserProfile',
        'GET:/{teamId}/users/me/meetings': 'getMyMeetings',
        'GET:/{teamId}/users/me/posts': 'getMyPosts',
        'GET:/{teamId}/users/me/reviews': 'getMyReviews',

        // Meetings
        'GET:/{teamId}/meetings/joined': 'getJoinedMeetings',
        'GET:/{teamId}/meetings/my': 'getMyCreatedMeetings',
        'GET:/{teamId}/meetings': 'getMeetings',
        'POST:/{teamId}/meetings': 'createMeeting',
        'GET:/{teamId}/meetings/{meetingId}': 'getMeetingDetail',
        'PATCH:/{teamId}/meetings/{meetingId}': 'updateMeeting',
        'DELETE:/{teamId}/meetings/{meetingId}': 'deleteMeeting',
        'POST:/{teamId}/meetings/{meetingId}/join': 'joinMeeting',
        'DELETE:/{teamId}/meetings/{meetingId}/join': 'leaveMeeting',
        'GET:/{teamId}/meetings/{meetingId}/participants': 'getParticipants',
        'PATCH:/{teamId}/meetings/{meetingId}/status': 'updateMeetingStatus',

        // Notifications
        'GET:/{teamId}/notifications': 'getNotifications',
        'DELETE:/{teamId}/notifications': 'deleteAllNotifications',
        'GET:/{teamId}/notifications/unread-count':
          'getUnreadNotificationCount',
        'PUT:/{teamId}/notifications/read-all': 'markAllNotificationsAsRead',
        'PUT:/{teamId}/notifications/{notificationId}/read':
          'markNotificationAsRead',
        'DELETE:/{teamId}/notifications/{notificationId}': 'deleteNotification',

        // Favorites
        'GET:/{teamId}/favorites': 'getFavorites',
        'GET:/{teamId}/favorites/count': 'getFavoriteCount',
        'POST:/{teamId}/meetings/{meetingId}/favorites': 'addFavorite',
        'DELETE:/{teamId}/meetings/{meetingId}/favorites': 'removeFavorite',

        // Reviews
        'GET:/{teamId}/reviews': 'getReviews',
        'GET:/{teamId}/reviews/statistics': 'getReviewStatistics',
        'GET:/{teamId}/reviews/categories/statistics':
          'getCategoryReviewStatistics',
        'PATCH:/{teamId}/reviews/{reviewId}': 'updateReview',
        'DELETE:/{teamId}/reviews/{reviewId}': 'deleteReview',
        'POST:/{teamId}/meetings/{meetingId}/reviews': 'createReview',
        'GET:/{teamId}/meetings/{meetingId}/reviews': 'getMeetingReviews',

        // Posts
        'GET:/{teamId}/posts': 'getPosts',
        'POST:/{teamId}/posts': 'createPost',
        'GET:/{teamId}/posts/{postId}': 'getPostDetail',
        'PATCH:/{teamId}/posts/{postId}': 'updatePost',
        'DELETE:/{teamId}/posts/{postId}': 'deletePost',
        'POST:/{teamId}/posts/{postId}/comments': 'createComment',
        'GET:/{teamId}/posts/{postId}/comments': 'getComments',
        'POST:/{teamId}/posts/{postId}/comments/{commentId}/like':
          'likeComment',
        'DELETE:/{teamId}/posts/{postId}/comments/{commentId}/like':
          'unlikeComment',
        'DELETE:/{teamId}/posts/{postId}/comments/{commentId}': 'deleteComment',
        'PATCH:/{teamId}/posts/{postId}/comments/{commentId}': 'updateComment',
        'POST:/{teamId}/posts/{postId}/like': 'likePost',
        'DELETE:/{teamId}/posts/{postId}/like': 'unlikePost',

        // Images
        'POST:/{teamId}/images': 'createPresignedUrl',

        // MeetingTypes
        'GET:/{teamId}/meeting-types': 'getMeetingTypes',
        'POST:/{teamId}/meeting-types': 'createMeetingType',
        'PATCH:/{teamId}/meeting-types/{typeId}': 'updateMeetingType',
        'DELETE:/{teamId}/meeting-types/{typeId}': 'deleteMeetingType',

        // Og
        'GET:/og': 'getOgMetadata',
      };

      return customNames[key] || templateRouteName;
    },
  },
});
