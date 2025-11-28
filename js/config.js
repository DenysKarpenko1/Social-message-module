export const widgetConfig = {
  selectors: [
    'dl.list',               
    '.product-prices__inner',
    'h1.product__title',     
    '.price-box',            
    'h1'                     
  ],

  messages: [
    "🔥 Цей товар переглядають 15 людей",
    "🚚 Безкоштовна доставка до точок видачі"
  ],
  ui: {
    title: "Увага:", 
    closeBtn: "✕",
    detailsLink: "Показати деталі акції..."
  },

  settings: {
    position: 'before', 
    checkInterval: 500, 
    timeout: 10000,     
    messageDelay: 1500,  
    animationDuration: 400 
  }
};