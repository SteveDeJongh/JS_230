document.addEventListener('DOMContentLoaded', e => {
  var inventory;

  (function() {
    inventory = {
      lastId: 0,
      collection: [],
      setDate: function() {
        var date = new Date();
        // $("#order_date").text(date.toUTCString());
        document.querySelector('#order_date').textContent = date.toUTCString();
      },
      cacheTemplate: function() {
        var $iTmpl = $("#inventory_item").remove();
        this.template = $iTmpl.html();
      },
      add: function() {
        this.lastId += 1;
        var item = {
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
        var found_item;

        this.collection.forEach(function(item) {
          if (item.id === id) {
            found_item = item;
            return false;
          }
        });

        return found_item;
      },
      update: function(itemel) {
        var id = this.findID(itemel),
            item = this.get(id);

            console.log(itemel);
        // item.name = $item.find("[name^=item_name]").val();
        item.name = itemel.querySelector(".item_name_ID").value;
        // item.stock_number = $item.find("[name^=item_stock_number]").val();
        item.stock_number = itemel.querySelector(".item_stock_number_ID").value;
        // item.quantity = $item.find("[name^=item_quantity]").val();
        item.quantity = itemel.querySelector(".item_quantity_ID").value;        
      },
      newItem: function(e) {
        e.preventDefault();
        let item = this.add();
        let inventory_template = Handlebars.compile(document.querySelector('#inventory_template').innerHTML);
        item = inventory_template(item);

        document.querySelector('#inventory').innerHTML += item;
      },
      findParent: function(e) {
        let el = e.target;

        while (el.tagName !== 'TR') {
          el = el.parentElement;
        }

        return el
      },
      findID: function(item) {
        return +item.querySelector("input[type=hidden]").value;
      },
      deleteItem: function(e) {
        if (e.target.tagName !== 'A') {
          return;
        }

        e.preventDefault();
        let item = this.findParent(e);
        item.remove();
        this.remove(this.findID(item));
      },
      updateItem: function(e) {
        // Still to do...
        console.log('triggered now!');

        if (e.target.tagName !== 'INPUT') {
          return;
        }

        console.log('triggered!');
        var item = this.findParent(e);

        this.update(item);
      },
      bindEvents: function() {
        // $("#add_item").on("click", this.newItem.bind(this));
        document.querySelector('#add_item').addEventListener('click', this.newItem.bind(this));
        // $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
        document.querySelector('#inventory').addEventListener('click', this.deleteItem.bind(this));
        // $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
        document.querySelector('#inventory').addEventListener('focus', this.updateItem.bind(this));
      },
      init: function() {
        this.setDate();
        this.cacheTemplate();
        this.bindEvents();
      }
    };
  })();

  $($.proxy(inventory.init, inventory));
});