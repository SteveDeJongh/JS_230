let inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      let date = new Date();
      // $("#order_date").text(date.toUTCString());
      document.querySelector('#order_date').textContent = date.toUTCString();
    },
    cacheTemplate: function() {
      // var $iTmpl = $("#inventory_item").remove();
      let iTmpl = document.querySelector('#inventory_item');
      // this.template = $iTmpl.html();
      this.template = Handlebars.compile(iTmpl.innerHTML);
      iTmpl.remove();
    },
    add: function() {
      this.lastId += 1;
      let item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      this.collection.push(item);

      return item;
    },
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    get: function(id) {
      let found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update: function(itemRow) {
      let id = this.findID(itemRow);
      let item = this.get(id);
      // item.name = $item.find("[name^=item_name]").val();
      item.name = itemRow.querySelector("[name^=item_name]").value;
      // item.stock_number = $item.find("[name^=item_stock_number]").val();
      item.stock_number = itemRow.querySelector("[name^=item_stock_number]").value;
      // item.quantity = $item.find("[name^=item_quantity]").val();
      item.quantity = itemRow.querySelector("[name^=item_quantity]").value;        
    },
    newItem: function(e) {
      // e.preventDefault();
      // var item = this.add(),
      //     $item = $(this.template.replace(/ID/g, item.id));

      // $("#inventory").append($item);
      e.preventDefault();
      let item = this.add();

      document.querySelector('#inventory')
              .insertAdjacentHTML('beforeend', this.template({id: item.id}));
    },
    findParent: function(e) {
      return e.target.closest('tr');
    },
    findID: function(item) {
      return +item.querySelector("input[type=hidden]").value;
    },
    deleteItem: function(e) {
      e.preventDefault();
      if (e.target.classList.contains('delete')) {
        let item = this.findParent(e);
        this.remove(this.findID(item));
        item.remove();
      }
    },
    updateItem: function(e) {
      if (e.target.tagName == 'INPUT') {
        let item = this.findParent(e);
        this.update(item);
      }
    },
    bindEvents: function() {
      // $("#add_item").on("click", this.newItem.bind(this));
      document.querySelector('#add_item').addEventListener('click', this.newItem.bind(this));
      // $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
      document.querySelector('#inventory')
              .addEventListener('click', this.deleteItem.bind(this));
      // $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
      document.querySelector('#inventory')
              .addEventListener('focusout', this.updateItem.bind(this));
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

// $($.proxy(inventory.init, inventory));
document.addEventListener('DOMContentLoaded', e => inventory.init.bind(inventory)());