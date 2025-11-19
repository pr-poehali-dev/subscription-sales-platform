import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [currentPage, setCurrentPage] = useState<'home' | 'sellers' | 'help' | 'contacts' | 'blog'>('home');

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

  const renderContent = () => {
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
                    <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
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
            SubMarket
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
            <Button variant="ghost" size="icon">
              <Icon name="User" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="ShoppingCart" size={20} />
            </Button>
          </div>
        </div>
      </nav>

      {renderContent()}

      <footer className="border-t border-border mt-20 py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-heading text-xl font-bold text-gradient mb-4">SubMarket</div>
              <p className="text-sm text-muted-foreground">
                Маркетплейс цифровых подписок
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
            © 2024 SubMarket. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;