from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register('profiles', views.user.UserProfileViewSet)
router.register('login', views.LoginViewSet, base_name='login')
router.register('records_full_detail',
                views.RecordsFullDetailViewSet, base_name='records_full_detail')
router.register('records', views.RecordsListViewSet, base_name='records')
router.register('clients', views.ClientsViewSet)
router.register('origin_countries', views.OriginCountriesViewSet)
router.register('create_profile', views.UserProfileCreatorViewSet,
                base_name='create_profile')
router.register('tags', views.TagViewSet)
router.register('groups', views.GroupViewSet, base_name='groups')
router.register('groups_test', views.GroupTestViewSet, base_name='groups_test')
router.register('permissions', views.PermissionViewSet, base_name='permissions')
router.register('has_permission', views.HasPermissionViewSet, base_name="has_permission")
router.register('rlcs', views.RlcViewSet, base_name='rlcs')
router.register('get_statics', views.GetStaticsViewSet, base_name='get_statics')

urlpatterns = [
  url(r'', include(router.urls)),
]
