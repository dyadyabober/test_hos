// Простая база данных для админ панели
class AdminDatabase {
    constructor() {
        this.initializeDatabase();
    }

    // Инициализация базы данных
    initializeDatabase() {
        // Проверяем, существует ли база данных
        if (!localStorage.getItem('hospital_admin_db')) {
            this.createInitialData();
        }
    }

    // Создание начальных данных
    createInitialData() {
        const initialData = {
            // Администраторы
            admins: {
                senior_admin: {
                    username: 'senior_admin',
                    password: 'admin123',
                    level: 'senior',
                    name: 'Головна дієт сестра',
                    department: 'Харчування',
                    created: new Date().toISOString(),
                    active: true
                },
                junior_admin: {
                    username: 'junior_admin',
                    password: 'junior123',
                    level: 'junior',
                    name: 'Старша сестра відділення',
                    department: 'Кардіологія',
                    created: new Date().toISOString(),
                    active: true
                }
            },

            // Отделения
            departments: {
                cardiology: { id: 'cardiology', name: 'Кардіологія', rooms: ['201', '202', '203', '204', '205'], active: true },
                neurology: { id: 'neurology', name: 'Неврологія', rooms: ['301', '302', '303', '304', '305'], active: true },
                surgery: { id: 'surgery', name: 'Хірургія', rooms: ['101', '102', '103', '104', '105'], active: true },
                therapy: { id: 'therapy', name: 'Терапія', rooms: ['401', '402', '403', '404', '405'], active: true }
            },

            // Меню по дням недели
            weeklyMenu: {
                monday: {
                    breakfast: {
                        title: 'Сніданок',
                        items: ['Сирні макарони з куркою', 'Хліб житній та пшеничний', 'Кава американо'],
                        calories: 450,
                        diet: 'general'
                    },
                    snack: {
                        title: 'До Сніданку',
                        items: ['Домашній сир', 'Фрукти (яблука, апельсини)', 'Кефір'],
                        calories: 280,
                        diet: 'general'
                    },
                    lunch: {
                        title: 'Обід',
                        items: ['Борщ український', 'Котлета по-київськи з картоплею', 'Салат овочевий', 'Компот'],
                        calories: 650,
                        diet: 'general'
                    },
                    dinner: {
                        title: 'Вечеря',
                        items: ['Риба запечена', 'Каша гречана', 'Чай з лимоном'],
                        calories: 420,
                        diet: 'general'
                    }
                },
                tuesday: {
                    breakfast: {
                        title: 'Сніданок',
                        items: ['Каша вівсяна з молоком', 'Хліб з маслом', 'Чай зелений'],
                        calories: 380,
                        diet: 'general'
                    },
                    snack: {
                        title: 'До Сніданку',
                        items: ['Йогурт натуральний', 'Банан', 'Горіхи'],
                        calories: 250,
                        diet: 'general'
                    },
                    lunch: {
                        title: 'Обід',
                        items: ['Суп курячий з локшиною', 'Біфштекс з картоплею фрі', 'Салат зі свіжих овочів', 'Морс ягідний'],
                        calories: 700,
                        diet: 'general'
                    },
                    dinner: {
                        title: 'Вечеря',
                        items: ['Курка тушкована', 'Рис відварний', 'Чай травяний'],
                        calories: 450,
                        diet: 'general'
                    }
                }
                // Можно добавить остальные дни недели
            },

            // Цены на питание
            mealPrices: {
                free: { name: 'Безкоштовне харчування', price: 0, description: 'Безкоштовне харчування для пацієнтів', editable: true },
                paid: { name: 'Платне харчування', price: 240, description: 'Платне харчування згідно меню', editable: true },
                military: { name: 'Військове меню', price: 180, description: 'Спеціальне харчування для військовослужбовців', editable: true },
                hypotrophy: { name: 'Гіпотрофія', price: 220, description: 'Спеціальне харчування при гіпотрофії', editable: true },
                hypertrophy: { name: 'Гіпертрофія', price: 200, description: 'Спеціальне харчування при гіпертрофії', editable: true },
                diabetes: { name: 'Цукровий діабет 2-го типу', price: 250, description: 'Дієтичне харчування для діабетиків', editable: true },
                postop: { name: 'Після операції', price: 230, description: 'Спеціальне харчування після операцій', editable: true }
            },

            // Заказы
            orders: [],

            // Остатки продуктов
            inventory: {
                meat: { name: 'М\'ясо та м\'ясопродукти', quantity: 150, unit: 'кг', minQuantity: 50, lastUpdated: new Date().toISOString() },
                vegetables: { name: 'Овочі', quantity: 200, unit: 'кг', minQuantity: 80, lastUpdated: new Date().toISOString() },
                dairy: { name: 'Молочні продукти', quantity: 100, unit: 'л', minQuantity: 30, lastUpdated: new Date().toISOString() },
                cereals: { name: 'Крупи та макарони', quantity: 80, unit: 'кг', minQuantity: 25, lastUpdated: new Date().toISOString() },
                bread: { name: 'Хлібобулочні вироби', quantity: 60, unit: 'шт', minQuantity: 20, lastUpdated: new Date().toISOString() }
            },

            // Кухонные заказы
            kitchenOrders: [],

            // Логи изменений
            changeLogs: [],

            // Настройки системы
            systemSettings: {
                lastBackup: new Date().toISOString(),
                version: '1.0.0',
                maintenanceMode: false
            }
        };

        localStorage.setItem('hospital_admin_db', JSON.stringify(initialData));
    }

    // Получить данные из базы
    getData(table = null) {
        const data = JSON.parse(localStorage.getItem('hospital_admin_db'));
        return table ? data[table] : data;
    }

    // Сохранить данные в базу
    setData(data) {
        localStorage.setItem('hospital_admin_db', JSON.stringify(data));
    }

    // Добавить лог изменения
    addChangeLog(action, details, adminUser) {
        const data = this.getData();
        const log = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            action: action,
            details: details,
            admin: adminUser,
            date: new Date().toLocaleDateString('uk-UA'),
            time: new Date().toLocaleTimeString('uk-UA')
        };
        data.changeLogs.push(log);
        this.setData(data);
        return log;
    }

    // МЕТОДЫ ДЛЯ АДМИНИСТРАТОРОВ

    // Добавить нового админа
    addAdmin(username, password, level, name, department) {
        const data = this.getData();
        if (data.admins[username]) {
            return { success: false, message: 'Адміністратор з таким логіном вже існує' };
        }

        data.admins[username] = {
            username: username,
            password: password,
            level: level,
            name: name,
            department: department,
            created: new Date().toISOString(),
            lastLogin: null,
            active: true
        };

        this.setData(data);
        this.addChangeLog('ADD_ADMIN', `Створено нового адміністратора: ${name} (${username})`, sessionStorage.getItem('adminUsername'));
        
        return { success: true, message: 'Адміністратор успішно створений' };
    }

    // Обновить админа
    updateAdmin(username, updates) {
        const data = this.getData();
        if (!data.admins[username]) {
            return { success: false, message: 'Адміністратор не знайдений' };
        }

        const oldData = { ...data.admins[username] };
        data.admins[username] = { ...data.admins[username], ...updates };
        
        this.setData(data);
        
        const changes = [];
        if (updates.name && updates.name !== oldData.name) changes.push(`ім'я: ${oldData.name} → ${updates.name}`);
        if (updates.department && updates.department !== oldData.department) changes.push(`відділення: ${oldData.department} → ${updates.department}`);
        if (updates.active !== undefined && updates.active !== oldData.active) changes.push(`статус: ${oldData.active ? 'активний' : 'неактивний'} → ${updates.active ? 'активний' : 'неактивний'}`);
        if (updates.password && updates.password !== oldData.password) changes.push('пароль змінено');
        
        this.addChangeLog('UPDATE_ADMIN', `Оновлено адміністратора ${username}: ${changes.join(', ')}`, sessionStorage.getItem('adminUsername'));
        
        return { success: true, message: 'Адміністратор успішно оновлений' };
    }

    // Удалить админа
    deleteAdmin(username) {
        const data = this.getData();
        if (!data.admins[username]) {
            return { success: false, message: 'Адміністратор не знайдений' };
        }

        if (username === 'senior_admin') {
            return { success: false, message: 'Неможливо видалити головного адміністратора' };
        }

        const adminName = data.admins[username].name;
        delete data.admins[username];
        
        this.setData(data);
        this.addChangeLog('DELETE_ADMIN', `Видалено адміністратора: ${adminName} (${username})`, sessionStorage.getItem('adminUsername'));
        
        return { success: true, message: 'Адміністратор успішно видалений' };
    }

    // Переключить статус админа
    toggleAdminStatus(username) {
        const data = this.getData();
        if (!data.admins[username]) {
            return { success: false, message: 'Адміністратор не знайдений' };
        }

        if (username === 'senior_admin') {
            return { success: false, message: 'Неможливо змінити статус головного адміністратора' };
        }

        data.admins[username].active = !data.admins[username].active;
        const newStatus = data.admins[username].active ? 'активований' : 'деактивований';
        
        this.setData(data);
        this.addChangeLog('TOGGLE_ADMIN_STATUS', `Адміністратор ${username} ${newStatus}`, sessionStorage.getItem('adminUsername'));
        
        return { success: true, message: `Адміністратор ${newStatus}`, newStatus: data.admins[username].active };
    }

    // Обновить время последнего входа
    updateLastLogin(username) {
        const data = this.getData();
        if (data.admins[username]) {
            data.admins[username].lastLogin = new Date().toISOString();
            this.setData(data);
        }
    }

    // Получить список админов
    getAdmins() {
        return this.getData('admins');
    }

    // МЕТОДЫ ДЛЯ МЕНЮ

    // Обновить меню
    updateMenu(day, mealType, menuData) {
        const data = this.getData();
        if (!data.weeklyMenu[day]) {
            data.weeklyMenu[day] = {};
        }
        data.weeklyMenu[day][mealType] = menuData;
        this.setData(data);
        this.addChangeLog('UPDATE_MENU', `Оновлено меню: ${day} - ${mealType}`, sessionStorage.getItem('adminUsername'));
        return { success: true, message: 'Меню успішно оновлено' };
    }

    // Получить меню
    getMenu(day = null) {
        const menu = this.getData('weeklyMenu');
        return day ? menu[day] : menu;
    }

    // МЕТОДЫ ДЛЯ ЦЕН

    // Обновить цены
    updatePrices(priceData) {
        const data = this.getData();
        Object.keys(priceData).forEach(key => {
            if (data.mealPrices[key]) {
                data.mealPrices[key] = { ...data.mealPrices[key], ...priceData[key] };
            }
        });
        this.setData(data);
        this.addChangeLog('UPDATE_PRICES', 'Оновлено ціни на харчування', sessionStorage.getItem('adminUsername'));
        return { success: true, message: 'Ціни успішно оновлені' };
    }

    // Получить цены
    getPrices() {
        return this.getData('mealPrices');
    }

    // Обновить название типа питания (только для главного админа)
    updateMealTypeName(typeId, newName, adminUser) {
        const data = this.getData();
        if (!data.mealPrices[typeId]) {
            return { success: false, message: 'Тип харчування не знайдено' };
        }

        if (!data.mealPrices[typeId].editable) {
            return { success: false, message: 'Цей тип харчування не можна редагувати' };
        }

        const oldName = data.mealPrices[typeId].name;
        data.mealPrices[typeId].name = newName;

        this.setData(data);
        this.addChangeLog('UPDATE_MEAL_TYPE_NAME', `Змінено назву типу харчування: ${oldName} → ${newName}`, adminUser);

        return { success: true, message: 'Назву типу харчування успішно оновлено' };
    }

    // Получить доступные типы питания для отделения
    getAvailableMealTypes(departmentId = null) {
        const data = this.getData();
        const mealTypes = data.mealPrices;

        // Если указано отделение, можно добавить специфичную логику
        if (departmentId && data.departments[departmentId]) {
            const department = data.departments[departmentId];
            if (department.allowedMealTypes) {
                const filtered = {};
                department.allowedMealTypes.forEach(typeId => {
                    if (mealTypes[typeId]) {
                        filtered[typeId] = mealTypes[typeId];
                    }
                });
                return filtered;
            }
        }

        return mealTypes;
    }

    // Установить доступные типы питания для отделения
    setDepartmentMealTypes(departmentId, allowedTypes, adminUser) {
        const data = this.getData();
        if (!data.departments[departmentId]) {
            return { success: false, message: 'Відділення не знайдено' };
        }

        data.departments[departmentId].allowedMealTypes = allowedTypes;

        this.setData(data);
        this.addChangeLog('UPDATE_DEPARTMENT_MEAL_TYPES', `Оновлено дозволені типи харчування для відділення ${data.departments[departmentId].name}`, adminUser);

        return { success: true, message: 'Типи харчування для відділення оновлено' };
    }

    // МЕТОДЫ ДЛЯ ЗАКАЗОВ

    // Добавить заказ
    addOrder(orderData) {
        const data = this.getData();
        const order = {
            id: Date.now(),
            ...orderData,
            status: 'new',
            created: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };
        data.orders.push(order);
        this.setData(data);
        this.addChangeLog('ADD_ORDER', `Створено замовлення #${order.id}`, orderData.createdBy || 'system');
        return order;
    }

    // Получить заказы
    getOrders(filter = null) {
        const orders = this.getData('orders');
        if (!filter) return orders;
        
        return orders.filter(order => {
            if (filter.status && order.status !== filter.status) return false;
            if (filter.department && order.department !== filter.department) return false;
            if (filter.date && order.date !== filter.date) return false;
            return true;
        });
    }

    // Обновить статус заказа
    updateOrderStatus(orderId, status, adminUser) {
        const data = this.getData();
        const order = data.orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
            order.lastModified = new Date().toISOString();
            this.setData(data);
            this.addChangeLog('UPDATE_ORDER_STATUS', `Змінено статус замовлення #${orderId} на ${status}`, adminUser);
            return { success: true, message: 'Статус замовлення оновлено' };
        }
        return { success: false, message: 'Замовлення не знайдено' };
    }

    // МЕТОДЫ ДЛЯ ОСТАТКОВ

    // Обновить остатки
    updateInventory(itemId, quantity, adminUser) {
        const data = this.getData();
        if (data.inventory[itemId]) {
            data.inventory[itemId].quantity = quantity;
            data.inventory[itemId].lastUpdated = new Date().toISOString();
            this.setData(data);
            this.addChangeLog('UPDATE_INVENTORY', `Оновлено залишки: ${data.inventory[itemId].name} - ${quantity} ${data.inventory[itemId].unit}`, adminUser);
            return { success: true, message: 'Залишки оновлені' };
        }
        return { success: false, message: 'Товар не знайдено' };
    }

    // Получить остатки
    getInventory() {
        return this.getData('inventory');
    }

    // Получить товары с низкими остатками
    getLowStockItems() {
        const inventory = this.getInventory();
        return Object.values(inventory).filter(item => item.quantity <= item.minQuantity);
    }

    // МЕТОДЫ ДЛЯ КУХОННЫХ ЗАКАЗОВ

    // Создать заказ для кухни
    createKitchenOrder(orderIds, adminUser) {
        const data = this.getData();
        const orders = data.orders.filter(o => orderIds.includes(o.id));
        
        const kitchenOrder = {
            id: Date.now(),
            orderIds: orderIds,
            totalOrders: orders.length,
            items: this.aggregateOrderItems(orders),
            status: 'pending',
            created: new Date().toISOString(),
            createdBy: adminUser,
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Завтра
        };

        data.kitchenOrders.push(kitchenOrder);
        
        // Обновить статус заказов
        orders.forEach(order => {
            order.status = 'in_kitchen';
            order.kitchenOrderId = kitchenOrder.id;
        });

        this.setData(data);
        this.addChangeLog('CREATE_KITCHEN_ORDER', `Створено замовлення для кухні #${kitchenOrder.id} (${orders.length} замовлень)`, adminUser);
        
        return kitchenOrder;
    }

    // Агрегировать позиции заказов
    aggregateOrderItems(orders) {
        const aggregated = {};
        
        orders.forEach(order => {
            const mealType = order.mealPlan || 'full';
            const key = `${mealType}_${order.date}`;
            
            if (!aggregated[key]) {
                aggregated[key] = {
                    mealType: mealType,
                    date: order.date,
                    count: 0,
                    departments: new Set()
                };
            }
            
            aggregated[key].count += 1;
            aggregated[key].departments.add(order.department);
        });

        // Преобразовать Set в массив
        Object.values(aggregated).forEach(item => {
            item.departments = Array.from(item.departments);
        });

        return Object.values(aggregated);
    }

    // Получить кухонные заказы
    getKitchenOrders() {
        return this.getData('kitchenOrders');
    }

    // МЕТОДЫ ДЛЯ УПРАВЛЕНИЯ ОТДЕЛЕНИЯМИ

    // Добавить новое отделение
    addDepartment(departmentId, departmentName) {
        const data = this.getData();
        
        if (data.departments[departmentId]) {
            return { success: false, message: 'Відділення з таким ID вже існує' };
        }

        data.departments[departmentId] = {
            id: departmentId,
            name: departmentName,
            rooms: [],
            active: true,
            created: new Date().toISOString()
        };

        this.setData(data);
        this.addChangeLog('ADD_DEPARTMENT', `Створено відділення: ${departmentName} (${departmentId})`, sessionStorage.getItem('adminUsername'));
        
        return { success: true, message: `Відділення "${departmentName}" успішно створено` };
    }

    // Удалить отделение
    removeDepartment(departmentId) {
        const data = this.getData();
        const department = data.departments[departmentId];
        
        if (!department) {
            return { success: false, message: 'Відділення не знайдено' };
        }

        if (department.rooms.length > 0) {
            return { success: false, message: 'Неможливо видалити відділення з палатами. Спочатку перемістіть або видаліть всі палати.' };
        }

        const departmentName = department.name;
        delete data.departments[departmentId];

        this.setData(data);
        this.addChangeLog('REMOVE_DEPARTMENT', `Видалено відділення: ${departmentName} (${departmentId})`, sessionStorage.getItem('adminUsername'));
        
        return { success: true, message: `Відділення "${departmentName}" успішно видалено` };
    }

    // Обновить отделение
    updateDepartment(departmentId, updates) {
        const data = this.getData();
        const department = data.departments[departmentId];
        
        if (!department) {
            return { success: false, message: 'Відділення не знайдено' };
        }

        const oldData = { ...department };
        data.departments[departmentId] = { ...department, ...updates };

        this.setData(data);
        
        const changes = [];
        if (updates.name && updates.name !== oldData.name) changes.push(`назва: ${oldData.name} → ${updates.name}`);
        if (updates.active !== undefined && updates.active !== oldData.active) changes.push(`статус: ${oldData.active ? 'активне' : 'неактивне'} → ${updates.active ? 'активне' : 'неактивне'}`);
        
        this.addChangeLog('UPDATE_DEPARTMENT', `Оновлено відділення ${departmentId}: ${changes.join(', ')}`, sessionStorage.getItem('adminUsername'));
        
        return { success: true, message: 'Відділення успішно оновлено' };
    }

    // МЕТОДЫ ДЛЯ УПРАВЛЕНИЯ ПАЛАТАМИ

    // Добавить новую палату
    addRoom(departmentId, roomNumber, roomType = 'standard', beds = 2) {
        const data = this.getData();
        const department = data.departments[departmentId];
        
        if (!department) {
            return { success: false, message: 'Відділення не знайдено' };
        }

        if (department.rooms.includes(roomNumber)) {
            return { success: false, message: 'Палата з таким номером вже існує в цьому відділенні' };
        }

        // Проверить, не занят ли номер в других отделениях
        const allRooms = Object.values(data.departments).flatMap(dept => dept.rooms);
        if (allRooms.includes(roomNumber)) {
            return { success: false, message: 'Номер палати вже використовується в іншому відділенні' };
        }

        department.rooms.push(roomNumber);
        department.rooms.sort((a, b) => {
            const numA = parseInt(a.replace(/\D/g, ''));
            const numB = parseInt(b.replace(/\D/g, ''));
            return numA - numB;
        });

        // Создать детальную информацию о палате
        if (!data.roomDetails) data.roomDetails = {};
        data.roomDetails[roomNumber] = {
            number: roomNumber,
            department: departmentId,
            type: roomType,
            beds: beds,
            status: 'active',
            created: new Date().toISOString(),
            lastModified: new Date().toISOString()
        };

        this.setData(data);
        this.addChangeLog('ADD_ROOM', `Додано палату ${roomNumber} в відділення ${department.name} (${beds} ліжок)`, sessionStorage.getItem('adminUsername'));
        
        return { success: true, message: `Палата ${roomNumber} успішно додана` };
    }

    // Удалить палату
    removeRoom(departmentId, roomNumber) {
        const data = this.getData();
        const department = data.departments[departmentId];
        
        if (!department) {
            return { success: false, message: 'Відділення не знайдено' };
        }

        const roomIndex = department.rooms.indexOf(roomNumber);
        if (roomIndex === -1) {
            return { success: false, message: 'Палата не знайдена' };
        }

        department.rooms.splice(roomIndex, 1);
        
        // Удалить детальную информацию
        if (data.roomDetails && data.roomDetails[roomNumber]) {
            delete data.roomDetails[roomNumber];
        }

        this.setData(data);
        this.addChangeLog('REMOVE_ROOM', `Видалено палату ${roomNumber} з відділення ${department.name}`, sessionStorage.getItem('adminUsername'));
        
        return { success: true, message: `Палата ${roomNumber} успішно видалена` };
    }

    // Обновить информацию о палате
    updateRoom(roomNumber, updates) {
        const data = this.getData();
        
        if (!data.roomDetails) data.roomDetails = {};
        if (!data.roomDetails[roomNumber]) {
            return { success: false, message: 'Палата не знайдена' };
        }

        const oldData = { ...data.roomDetails[roomNumber] };
        data.roomDetails[roomNumber] = { 
            ...data.roomDetails[roomNumber], 
            ...updates,
            lastModified: new Date().toISOString()
        };

        this.setData(data);
        
        const changes = [];
        if (updates.type && updates.type !== oldData.type) changes.push(`тип: ${oldData.type} → ${updates.type}`);
        if (updates.beds && updates.beds !== oldData.beds) changes.push(`ліжок: ${oldData.beds} → ${updates.beds}`);
        if (updates.status && updates.status !== oldData.status) changes.push(`статус: ${oldData.status} → ${updates.status}`);
        
        this.addChangeLog('UPDATE_ROOM', `Оновлено палату ${roomNumber}: ${changes.join(', ')}`, sessionStorage.getItem('adminUsername'));
        
        return { success: true, message: 'Палата успішно оновлена' };
    }

    // Переместить палату в другое отделение
    moveRoom(roomNumber, newDepartmentId) {
        const data = this.getData();
        const newDepartment = data.departments[newDepartmentId];
        
        if (!newDepartment) {
            return { success: false, message: 'Нове відділення не знайдено' };
        }

        // Найти текущее отделение палаты
        let currentDepartment = null;
        let currentDepartmentId = null;
        
        for (const [deptId, dept] of Object.entries(data.departments)) {
            if (dept.rooms.includes(roomNumber)) {
                currentDepartment = dept;
                currentDepartmentId = deptId;
                break;
            }
        }

        if (!currentDepartment) {
            return { success: false, message: 'Поточне відділення палати не знайдено' };
        }

        if (currentDepartmentId === newDepartmentId) {
            return { success: false, message: 'Палата вже знаходиться в цьому відділенні' };
        }

        // Удалить из текущего отделения
        const roomIndex = currentDepartment.rooms.indexOf(roomNumber);
        currentDepartment.rooms.splice(roomIndex, 1);

        // Добавить в новое отделение
        newDepartment.rooms.push(roomNumber);
        newDepartment.rooms.sort((a, b) => {
            const numA = parseInt(a.replace(/\D/g, ''));
            const numB = parseInt(b.replace(/\D/g, ''));
            return numA - numB;
        });

        // Обновить информацию о палате
        if (data.roomDetails && data.roomDetails[roomNumber]) {
            data.roomDetails[roomNumber].department = newDepartmentId;
            data.roomDetails[roomNumber].lastModified = new Date().toISOString();
        }

        this.setData(data);
        this.addChangeLog('MOVE_ROOM', `Переміщено палату ${roomNumber} з ${currentDepartment.name} в ${newDepartment.name}`, sessionStorage.getItem('adminUsername'));
        
        return { success: true, message: `Палата ${roomNumber} успішно переміщена в ${newDepartment.name}` };
    }

    // Получить детальную информацию о палатах
    getRoomDetails(departmentId = null) {
        const data = this.getData();
        if (!data.roomDetails) return {};
        
        if (departmentId) {
            const filtered = {};
            Object.keys(data.roomDetails).forEach(roomNumber => {
                if (data.roomDetails[roomNumber].department === departmentId) {
                    filtered[roomNumber] = data.roomDetails[roomNumber];
                }
            });
            return filtered;
        }
        
        return data.roomDetails;
    }

    // Получить статистику по палатам
    getRoomStatistics() {
        const data = this.getData();
        const departments = data.departments;
        const roomDetails = data.roomDetails || {};
        
        const stats = {
            totalRooms: 0,
            totalBeds: 0,
            byDepartment: {},
            byType: {},
            byStatus: {}
        };

        Object.keys(departments).forEach(deptId => {
            const dept = departments[deptId];
            const roomCount = dept.rooms.length;
            stats.totalRooms += roomCount;
            
            stats.byDepartment[deptId] = {
                name: dept.name,
                rooms: roomCount,
                beds: 0
            };
            
            dept.rooms.forEach(roomNumber => {
                const roomDetail = roomDetails[roomNumber];
                if (roomDetail) {
                    const beds = roomDetail.beds || 2;
                    stats.totalBeds += beds;
                    stats.byDepartment[deptId].beds += beds;
                    
                    // По типам
                    const type = roomDetail.type || 'standard';
                    stats.byType[type] = (stats.byType[type] || 0) + 1;
                    
                    // По статусам
                    const status = roomDetail.status || 'active';
                    stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
                } else {
                    // Палата без детальной информации, считаем стандартной
                    stats.totalBeds += 2;
                    stats.byDepartment[deptId].beds += 2;
                    stats.byType['standard'] = (stats.byType['standard'] || 0) + 1;
                    stats.byStatus['active'] = (stats.byStatus['active'] || 0) + 1;
                }
            });
        });

        return stats;
    }

    // МЕТОДЫ ДЛЯ ОТЧЕТОВ И ЛОГОВ

    // Получить логи изменений
    getChangeLogs(limit = 50) {
        const logs = this.getData('changeLogs');
        return logs.slice(-limit).reverse(); // Последние записи в начале
    }

    // Получить статистику заказов
    getOrderStatistics(dateFrom = null, dateTo = null) {
        const orders = this.getOrders();
        let filteredOrders = orders;

        if (dateFrom || dateTo) {
            filteredOrders = orders.filter(order => {
                const orderDate = new Date(order.created);
                if (dateFrom && orderDate < new Date(dateFrom)) return false;
                if (dateTo && orderDate > new Date(dateTo)) return false;
                return true;
            });
        }

        const stats = {
            total: filteredOrders.length,
            byStatus: {},
            byDepartment: {},
            byMealType: {},
            totalRevenue: 0
        };

        filteredOrders.forEach(order => {
            // По статусам
            stats.byStatus[order.status] = (stats.byStatus[order.status] || 0) + 1;
            
            // По отделениям
            stats.byDepartment[order.department] = (stats.byDepartment[order.department] || 0) + 1;
            
            // По типу питания
            stats.byMealType[order.mealPlan] = (stats.byMealType[order.mealPlan] || 0) + 1;
            
            // Общий доход
            stats.totalRevenue += order.totalAmount || 0;
        });

        return stats;
    }

    // УТИЛИТЫ

    // Очистить базу данных (только для разработки)
    clearDatabase() {
        localStorage.removeItem('hospital_admin_db');
        this.createInitialData();
    }

    // Экспорт данных
    exportData() {
        return this.getData();
    }

    // Импорт данных
    importData(data) {
        this.setData(data);
        this.addChangeLog('IMPORT_DATA', 'Імпортовано дані', sessionStorage.getItem('adminUsername'));
    }

    // Создать резервную копию
    createBackup() {
        const data = this.getData();
        data.systemSettings.lastBackup = new Date().toISOString();
        this.setData(data);
        
        const backup = {
            timestamp: new Date().toISOString(),
            data: data
        };
        
        return backup;
    }
}

// Создаем глобальный экземпляр базы данных
window.AdminDB = new AdminDatabase();