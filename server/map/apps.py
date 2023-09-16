from django.apps import AppConfig


class MapConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'map'

    def ready(self) -> None:
        from jobs.sched import start
        start()
        return super().ready()
