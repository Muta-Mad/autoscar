# ruff: noqa
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'autoscar.settings')
django.setup()

from api.models import Category, Service

CATALOG = [
    (
        ('Техническое обслуживание', 'Mantenimiento', 'Maintenance'),
        [
            ('Замена масла и фильтра', 'Cambio de aceite y filtro', 'Oil and filter change'),
            ('Замена салонного фильтра', 'Cambio del filtro de habitáculo', 'Cabin air filter replacement'),
            ('Замена воздушного фильтра', 'Cambio del filtro de aire', 'Air filter replacement'),
            ('Замена топливного фильтра', 'Cambio del filtro de combustible', 'Fuel filter replacement'),
            ('Замена масла в КПП', 'Cambio de aceite de la caja de cambios', 'Gearbox oil change'),
            ('Замена масла в АКПП', 'Cambio de aceite de la transmisión automática', 'Automatic transmission oil change'),
            ('Замена масла в редукторе / раздаточной коробке', 'Cambio de aceite del diferencial / caja de transferencia', 'Differential / transfer case oil change'),
            ('Замена свечей зажигания', 'Cambio de bujías', 'Spark plug replacement'),
            ('Полный осмотр автомобиля', 'Inspección completa del vehículo', 'Full vehicle inspection'),
            ('Компьютерная диагностика', 'Diagnóstico informático', 'Computer diagnostics'),
        ],
    ),
    (
        ('Двигатель', 'Motor', 'Engine'),
        [
            ('Замена комплекта ГРМ (ремень)', 'Cambio del kit de distribución (correa)', 'Timing belt kit replacement'),
            ('Замена комплекта ГРМ (цепь)', 'Cambio del kit de distribución (cadena)', 'Timing chain kit replacement'),
            ('Замена прокладки клапанной крышки', 'Cambio de la junta de la tapa de válvulas', 'Valve cover gasket replacement'),
            ('Замена приводного ремня', 'Cambio de la correa auxiliar', 'Auxiliary drive belt replacement'),
            ('Замена опор двигателя', 'Cambio de soportes del motor', 'Engine mount replacement'),
            ('Ремонт топливной системы — бензин / дизель', 'Reparación del sistema de combustible — gasolina / diésel', 'Fuel system repair — petrol / diesel'),
        ],
    ),
    (
        ('Система охлаждения', 'Sistema de refrigeración', 'Cooling system'),
        [
            ('Замена охлаждающей жидкости', 'Cambio del líquido refrigerante', 'Coolant replacement'),
            ('Промывка системы охлаждения', 'Limpieza del sistema de refrigeración', 'Cooling system flush'),
            ('Замена радиаторов', 'Cambio de radiadores', 'Radiator replacement'),
        ],
    ),
    (
        ('Тормозная система', 'Sistema de frenos', 'Brake system'),
        [
            ('Замена передних и задних тормозных колодок', 'Cambio de pastillas de freno delanteras y traseras', 'Front and rear brake pad replacement'),
            ('Замена тормозной жидкости', 'Cambio del líquido de frenos', 'Brake fluid replacement'),
            ('Прокачка тормозной системы', 'Purgado del sistema de frenos', 'Brake system bleeding'),
            ('Замена суппорта в сборе', 'Cambio de la pinza de freno completa', 'Complete brake caliper replacement'),
            ('Замена тормозного шланга (+ прокачка)', 'Cambio del latiguillo de freno (+ purgado)', 'Brake hose replacement (+ bleeding)'),
        ],
    ),
    (
        ('Трансмиссия', 'Transmisión', 'Transmission'),
        [
            ('Замена сцепления', 'Cambio del embrague', 'Clutch replacement'),
            ('Замена сальника привода', 'Cambio del retén del palier', 'Drive shaft seal replacement'),
            ('Замена КПП в сборе', 'Cambio de la caja de cambios completa', 'Complete gearbox replacement'),
        ],
    ),
    (
        ('Подвеска', 'Suspensión', 'Suspension'),
        [
            ('Замена стойки амортизатора', 'Cambio del amortiguador', 'Shock absorber replacement'),
            ('Замена шаровой опоры', 'Cambio de la rótula', 'Ball joint replacement'),
            ('Замена рычагов', 'Cambio de brazos de suspensión', 'Control arm replacement'),
            ('Замена подшипника ступицы', 'Cambio del rodamiento de rueda', 'Wheel bearing replacement'),
            ('Замена втулок стабилизатора', 'Cambio de casquillos de la barra estabilizadora', 'Stabilizer bar bushing replacement'),
            ('Замена пружины амортизатора', 'Cambio del muelle de suspensión', 'Suspension spring replacement'),
            ('Замена опоры стойки амортизатора', 'Cambio del soporte superior del amortiguador', 'Strut mount replacement'),
            ('Замена стойки стабилизатора', 'Cambio de bieleta de estabilizadora', 'Stabilizer link replacement'),
            ('Замена сайлентблока рычага', 'Cambio del silentblock del brazo de suspensión', 'Control arm bushing replacement'),
            ('Замена ступицы', 'Cambio del buje de rueda', 'Wheel hub replacement'),
        ],
    ),
    (
        ('Рулевое управление', 'Dirección', 'Steering'),
        [
            ('Замена рулевой тяги', 'Cambio de la barra de dirección', 'Tie rod replacement'),
            ('Замена рулевой рейки в сборе', 'Cambio de la cremallera de dirección completa', 'Complete steering rack replacement'),
            ('Замена рулевой колонки', 'Cambio de la columna de dirección', 'Steering column replacement'),
        ],
    ),
    (
        ('Топливная система', 'Sistema de combustible', 'Fuel system'),
        [
            ('Диагностика топливной системы', 'Diagnóstico del sistema de combustible', 'Fuel system diagnostics'),
            ('Ремонт топливной системы — бензин / дизель', 'Reparación del sistema de combustible — gasolina / diésel', 'Fuel system repair — petrol / diesel'),
            ('Замена топливного насоса', 'Cambio de la bomba de combustible', 'Fuel pump replacement'),
            ('Замена топливного фильтра', 'Cambio del filtro de combustible', 'Fuel filter replacement'),
        ],
    ),
    (
        ('Кондиционер', 'Aire acondicionado', 'Air conditioning'),
        [
            ('Заправка кондиционера (R134a)', 'Carga de aire acondicionado (R134a)', 'Air conditioning recharge (R134a)'),
            ('Диагностика системы кондиционирования', 'Diagnóstico del sistema de aire acondicionado', 'Air conditioning system diagnostics'),
            ('Замена компрессора кондиционера', 'Cambio del compresor de aire acondicionado', 'Air conditioning compressor replacement'),
        ],
    ),
    (
        ('Электрика', 'Electricidad', 'Electrical'),
        [
            ('Замена генератора', 'Cambio del alternador', 'Alternator replacement'),
            ('Замена стартера', 'Cambio del motor de arranque', 'Starter motor replacement'),
            ('Компьютерная диагностика', 'Diagnóstico informático', 'Computer diagnostics'),
            ('Диагностика электрооборудования', 'Diagnóstico del sistema eléctrico', 'Electrical system diagnostics'),
        ],
    ),
    (
        ('Прочие работы', 'Otros trabajos', 'Other services'),
        [
            ('Замена моторчика омывателя', 'Cambio de la bomba del lavaparabrisas', 'Windshield washer pump replacement'),
            ('Замена щёток стеклоочистителя', 'Cambio de escobillas limpiaparabrisas', 'Wiper blade replacement'),
            ('Замена ламп', 'Cambio de bombillas', 'Bulb replacement'),
            ('Замена аккумулятора', 'Cambio de batería', 'Battery replacement'),
        ],
    ),
]

created_categories = 0
created_services = 0

for (name_ru, name_es, name_en), services in CATALOG:
    category, cat_created = Category.objects.get_or_create(
        name=name_ru,
        defaults={'name_es': name_es, 'name_en': name_en, 'is_active': True},
    )
    if cat_created:
        created_categories += 1
        print(f'Категория создана: {name_ru}')

    for svc_ru, svc_es, svc_en in services:
        _, svc_created = Service.objects.get_or_create(
            category=category,
            name=svc_ru,
            defaults={'name_es': svc_es, 'name_en': svc_en, 'price': None},
        )
        if svc_created:
            created_services += 1

print(f'Итого: категорий создано {created_categories}, услуг создано {created_services}')
