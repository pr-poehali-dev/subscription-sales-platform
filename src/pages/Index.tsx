import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Subscription {
  id: number;
  name: string;
  category: string;
  price: number;
  period: string;
  rating: number;
  sales: number;
  image: string;
  popular: boolean;
}

const subscriptions: Subscription[] = [
  { id: 1, name: 'ChatGPT Plus', category: 'AI', price: 1500, period: 'мес', rating: 4.9, sales: 12540, image: '🤖', popular: true },
  { id: 2, name: 'Netflix Premium', category: 'Стриминг', price: 899, period: 'мес', rating: 4.8, sales: 8920, image: '🎬', popular: true },
  { id: 3, name: 'Spotify Premium', category: 'Музыка', price: 299, period: 'мес', rating: 4.7, sales: 6780, image: '🎵', popular: false },
  { id: 4, name: 'Adobe Creative Cloud', category: 'Дизайн', price: 2499, period: 'мес', rating: 4.9, sales: 5420, image: '🎨', popular: true },
  { id: 5, name: 'YouTube Premium', category: 'Стриминг', price: 399, period: 'мес', rating: 4.6, sales: 9840, image: '📺', popular: false },
  { id: 6, name: 'Microsoft 365', category: 'Офис', price: 699, period: 'мес', rating: 4.8, sales: 11200, image: '💼', popular: true },
  { id: 7, name: 'Midjourney Pro', category: 'AI', price: 2900, period: 'мес', rating: 4.9, sales: 4350, image: '🎭', popular: false },
  { id: 8, name: 'GitHub Copilot', category: 'Разработка', price: 990, period: 'мес', rating: 4.8, sales: 7650, image: '⚡', popular: true },
];

const categories = ['Все', 'AI', 'Стриминг', 'Музыка', 'Дизайн', 'Офис', 'Разработка'];

function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<'home' | 'sellers' | 'help' | 'contacts' | 'blog' | 'payment' | 'register' | 'qr-payment'>('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  const filteredSubscriptions = subscriptions
    .filter(sub => selectedCategory === 'Все' || sub.category === selectedCategory)
    .filter(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'popular') return b.sales - a.sales;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const handlePayment = (fullName: string, email: string, amount: number, agreed: boolean) => {
    if (!agreed) {
      alert('Пожалуйста, согласитесь с условиями публичной оферты');
      return;
    }
    setCurrentPage('qr-payment');
  };

  const renderContent = () => {
    if (currentPage === 'payment') {
      return (
        <div className="min-h-screen pt-32 px-4 max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Оплата подписки
            </h1>
            <p className="text-xl text-muted-foreground">
              {selectedSubscription ? `${selectedSubscription.name} — ${selectedSubscription.price}₽/${selectedSubscription.period}` : 'Заполните данные для оформления подписки'}
            </p>
          </div>

          <Card className="bg-card border-border card-glow">
            <CardContent className="p-8">
              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handlePayment(
                  formData.get('fullName') as string,
                  formData.get('email') as string,
                  Number(formData.get('amount')),
                  formData.get('agreed') === 'on'
                );
              }}>
                <div>
                  <label className="block text-sm font-medium mb-2">ФИО</label>
                  <Input 
                    name="fullName"
                    placeholder="Иванов Иван Иванович" 
                    className="bg-input border-border"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Электронная почта</label>
                  <Input 
                    name="email"
                    type="email"
                    placeholder="example@mail.ru" 
                    className="bg-input border-border"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Сумма оплаты (₽)</label>
                  <Input 
                    name="amount"
                    type="number"
                    placeholder="1500" 
                    className="bg-input border-border"
                    defaultValue={selectedSubscription?.price || ''}
                    required
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox name="agreed" id="agreed" required className="mt-1" />
                  <label htmlFor="agreed" className="text-sm text-muted-foreground cursor-pointer">
                    Я согласен с условиями{' '}
                    <a href="#" className="text-primary hover:underline">публичной оферты</a>
                    {' '}и{' '}
                    <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
                  </label>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-14 text-lg">
                  Оплатить
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  После нажатия кнопки будет создан аккаунт и откроется страница оплаты
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentPage === 'qr-payment') {
      return (
        <div className="min-h-screen pt-32 px-4 max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Оплата по QR-коду
            </h1>
            <p className="text-xl text-muted-foreground">
              Отсканируйте QR-код для оплаты через НСПК
            </p>
          </div>

          <Card className="bg-card border-border card-glow">
            <CardContent className="p-8 text-center">
              <div className="bg-white p-8 rounded-lg inline-block mb-6">
                <div className="w-64 h-64 flex items-center justify-center border-4 border-primary/20 rounded-lg">
                  <div className="text-center">
                    <Icon name="QrCode" size={200} className="text-primary" />
                  </div>
                </div>
              </div>

              <h3 className="font-heading text-2xl font-bold mb-4">Банк Авангард</h3>
              <p className="text-muted-foreground mb-6">
                Откройте приложение вашего банка и отсканируйте QR-код<br />
                для оплаты через систему НСПК
              </p>

              <div className="space-y-3 text-left max-w-md mx-auto mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="CheckCircle" size={20} className="text-primary" />
                  <span>Безопасная оплата через НСПК</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="CheckCircle" size={20} className="text-primary" />
                  <span>Мгновенное зачисление средств</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="CheckCircle" size={20} className="text-primary" />
                  <span>Поддержка всех российских банков</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                onClick={() => setCurrentPage('home')}
                className="w-full"
              >
                Вернуться на главную
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentPage === 'register') {
      return (
        <div className="min-h-screen pt-32 px-4 max-w-md mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Регистрация
            </h1>
            <p className="text-xl text-muted-foreground">
              Создайте аккаунт в Easy pay
            </p>
          </div>

          <Card className="bg-card border-border card-glow">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">ФИО</label>
                  <Input 
                    placeholder="Иванов Иван Иванович" 
                    className="bg-input border-border"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Электронная почта</label>
                  <Input 
                    type="email"
                    placeholder="example@mail.ru" 
                    className="bg-input border-border"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Пароль</label>
                  <Input 
                    type="password"
                    placeholder="Минимум 8 символов" 
                    className="bg-input border-border"
                    required
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox id="terms" required className="mt-1" />
                  <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                    Я согласен с{' '}
                    <a href="#" className="text-primary hover:underline">условиями использования</a>
                    {' '}и{' '}
                    <a href="#" className="text-primary hover:underline">политикой конфиденциальности</a>
                  </label>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-14 text-lg">
                  Зарегистрироваться
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  Уже есть аккаунт?{' '}
                  <button type="button" className="text-primary hover:underline">
                    Войти
                  </button>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentPage === 'sellers') {
      return (
        <div className="min-h-screen pt-32 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Станьте продавцом
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Продавайте цифровые подписки и зарабатывайте по агентскому договору
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card border-border card-glow hover-scale">
              <CardContent className="p-8">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="font-heading text-2xl font-bold mb-3">До 30% комиссии</h3>
                <p className="text-muted-foreground">Высокий процент с каждой продажи</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border card-glow hover-scale">
              <CardContent className="p-8">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="font-heading text-2xl font-bold mb-3">Быстрые выплаты</h3>
                <p className="text-muted-foreground">Вывод средств в течение 24 часов</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border card-glow hover-scale">
              <CardContent className="p-8">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="font-heading text-2xl font-bold mb-3">Аналитика</h3>
                <p className="text-muted-foreground">Детальная статистика продаж</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border card-glow max-w-md mx-auto">
            <CardContent className="p-8">
              <h3 className="font-heading text-2xl font-bold mb-6 text-center">Начать продавать</h3>
              <form className="space-y-4">
                <Input placeholder="Ваше имя" className="bg-input border-border" />
                <Input placeholder="Email" type="email" className="bg-input border-border" />
                <Input placeholder="Telegram" className="bg-input border-border" />
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentPage === 'help') {
      return (
        <div className="min-h-screen pt-32 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Помощь
            </h1>
            <p className="text-xl text-muted-foreground">
              Ответы на частые вопросы
            </p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'Как купить подписку?', a: 'Выберите нужную подписку, нажмите "Купить" и следуйте инструкциям для оплаты.' },
              { q: 'Как получить доступ после оплаты?', a: 'Данные для входа придут на указанный email в течение 5 минут после оплаты.' },
              { q: 'Можно ли вернуть деньги?', a: 'Возврат возможен в течение 14 дней, если подписка не была активирована.' },
              { q: 'Как продлить подписку?', a: 'Зайдите в личный кабинет и выберите опцию автоматического продления.' },
            ].map((item, idx) => (
              <Card key={idx} className="bg-card border-border card-glow hover-scale">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-bold mb-2">{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    if (currentPage === 'contacts') {
      return (
        <div className="min-h-screen pt-32 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Контакты
            </h1>
            <p className="text-xl text-muted-foreground">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card border-border card-glow hover-scale">
              <CardContent className="p-8 text-center">
                <Icon name="Mail" size={48} className="mx-auto mb-4 text-primary" />
                <h3 className="font-heading text-2xl font-bold mb-2">Email</h3>
                <p className="text-muted-foreground">support@market.ru</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border card-glow hover-scale">
              <CardContent className="p-8 text-center">
                <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-secondary" />
                <h3 className="font-heading text-2xl font-bold mb-2">Telegram</h3>
                <p className="text-muted-foreground">@market_support</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border card-glow mt-8">
            <CardContent className="p-8">
              <h3 className="font-heading text-2xl font-bold mb-6 text-center">Написать нам</h3>
              <form className="space-y-4">
                <Input placeholder="Ваше имя" className="bg-input border-border" />
                <Input placeholder="Email" type="email" className="bg-input border-border" />
                <textarea 
                  placeholder="Сообщение" 
                  className="w-full p-3 bg-input border border-border rounded-md min-h-[120px] text-foreground"
                />
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Отправить
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (currentPage === 'blog') {
      return (
        <div className="min-h-screen pt-32 px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-gradient">
              Блог
            </h1>
            <p className="text-xl text-muted-foreground">
              Новости и полезные материалы
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Лучшие AI-сервисы 2024', date: '15 ноября', category: 'AI', emoji: '🤖' },
              { title: 'Как выбрать стриминг', date: '12 ноября', category: 'Стриминг', emoji: '🎬' },
              { title: 'Обзор ChatGPT Plus', date: '10 ноября', category: 'AI', emoji: '💬' },
              { title: 'Spotify vs Apple Music', date: '8 ноября', category: 'Музыка', emoji: '🎵' },
              { title: 'Adobe для новичков', date: '5 ноября', category: 'Дизайн', emoji: '🎨' },
              { title: 'Топ подписок для бизнеса', date: '1 ноября', category: 'Офис', emoji: '💼' },
            ].map((post, idx) => (
              <Card key={idx} className="bg-card border-border card-glow hover-scale cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{post.emoji}</div>
                  <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">
                    {post.category}
                  </Badge>
                  <h3 className="font-heading text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="relative min-h-[600px] flex items-center justify-center px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
          
          <div className="relative z-10 text-center max-w-5xl mx-auto animate-fade-in">
            <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6 text-gradient">
              Цифровые подписки
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Покупайте популярные подписки по выгодным ценам. Агентский договор.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <div className="relative flex-1 w-full">
                <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input 
                  placeholder="Поиск подписок..." 
                  className="pl-12 h-14 bg-card border-border text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="lg" className="h-14 px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full sm:w-auto">
                Найти
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {['🤖 AI', '🎬 Стриминг', '🎵 Музыка', '🎨 Дизайн'].map((tag) => (
                <Badge key={tag} variant="secondary" className="px-4 py-2 text-sm bg-card border-border hover-scale cursor-pointer">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? 'bg-gradient-to-r from-primary to-secondary' : ''}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[220px] bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">По популярности</SelectItem>
                <SelectItem value="price-asc">Цена: низкая → высокая</SelectItem>
                <SelectItem value="price-desc">Цена: высокая → низкая</SelectItem>
                <SelectItem value="rating">По рейтингу</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSubscriptions.map((sub, idx) => (
              <Card key={sub.id} className="bg-card border-border card-glow hover-scale cursor-pointer animate-scale-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <CardContent className="p-6">
                  {sub.popular && (
                    <Badge className="mb-3 bg-gradient-to-r from-primary to-secondary">
                      Популярное
                    </Badge>
                  )}
                  <div className="text-6xl mb-4">{sub.image}</div>
                  <h3 className="font-heading text-xl font-bold mb-2">{sub.name}</h3>
                  <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
                    {sub.category}
                  </Badge>
                  
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    <span>{sub.rating}</span>
                    <span>•</span>
                    <span>{sub.sales.toLocaleString()} продаж</span>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <div className="font-heading text-3xl font-bold text-gradient">
                        {sub.price}₽
                      </div>
                      <div className="text-sm text-muted-foreground">/ {sub.period}</div>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      onClick={() => {
                        setSelectedSubscription(sub);
                        setCurrentPage('payment');
                      }}
                    >
                      Купить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="font-heading text-2xl font-bold text-gradient cursor-pointer" onClick={() => setCurrentPage('home')}>
            Easy pay
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setCurrentPage('home')} className={`hover:text-primary transition-colors ${currentPage === 'home' ? 'text-primary' : ''}`}>
              Каталог
            </button>
            <button onClick={() => setCurrentPage('sellers')} className={`hover:text-primary transition-colors ${currentPage === 'sellers' ? 'text-primary' : ''}`}>
              Продавцам
            </button>
            <button onClick={() => setCurrentPage('help')} className={`hover:text-primary transition-colors ${currentPage === 'help' ? 'text-primary' : ''}`}>
              Помощь
            </button>
            <button onClick={() => setCurrentPage('blog')} className={`hover:text-primary transition-colors ${currentPage === 'blog' ? 'text-primary' : ''}`}>
              Блог
            </button>
            <button onClick={() => setCurrentPage('contacts')} className={`hover:text-primary transition-colors ${currentPage === 'contacts' ? 'text-primary' : ''}`}>
              Контакты
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setShowAuthModal(true)}>
              <Icon name="User" size={20} />
            </Button>
            <Button variant="ghost" className="hidden md:flex" onClick={() => setCurrentPage('payment')}>
              Оплатить подписку
            </Button>
          </div>
        </div>
      </nav>

      {renderContent()}

      <footer className="border-t border-border mt-20 py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-heading text-xl font-bold text-gradient mb-4">Easy pay</div>
              <p className="text-sm text-muted-foreground">
                Платежный сервис для подписок
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-3">Категории</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>AI-сервисы</div>
                <div>Стриминг</div>
                <div>Дизайн</div>
                <div>Разработка</div>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-3">Компания</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>О нас</div>
                <div>Вакансии</div>
                <div>Партнерам</div>
                <div>Пресса</div>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-bold mb-3">Поддержка</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Помощь</div>
                <div>Контакты</div>
                <div>Политика</div>
                <div>Условия</div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 Easy pay. Все права защищены.
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-lg border-t border-border">
        <div className="grid grid-cols-4 gap-1 p-2">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${currentPage === 'home' ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
          >
            <Icon name="Home" size={20} />
            <span className="text-xs">Главная</span>
          </button>
          <button 
            onClick={() => setCurrentPage('payment')}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${currentPage === 'payment' ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
          >
            <Icon name="CreditCard" size={20} />
            <span className="text-xs">Оплатить</span>
          </button>
          <a 
            href="https://t.me/LuckyLuciano009"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors text-muted-foreground"
          >
            <Icon name="MessageCircle" size={20} />
            <span className="text-xs">Чат</span>
          </a>
          <button 
            onClick={() => setShowAuthModal(true)}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors text-muted-foreground"
          >
            <Icon name="User" size={20} />
            <span className="text-xs">Профиль</span>
          </button>
        </div>
      </div>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-center">Вход в аккаунт</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input 
                type="email"
                placeholder="example@mail.ru" 
                className="bg-input border-border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <Input 
                type="password"
                placeholder="Введите пароль" 
                className="bg-input border-border"
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Войти
            </Button>
            <div className="text-center">
              <button 
                type="button" 
                onClick={() => {
                  setShowAuthModal(false);
                  setCurrentPage('register');
                }}
                className="text-sm text-primary hover:underline"
              >
                Создать аккаунт
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Index;