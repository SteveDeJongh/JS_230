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
      update: function($item) {
        var id = this.findID($item),
            item = this.get(id);

        item.name = $item.find("[name^=item_name]").val();
        item.stock_number = $item.find("[name^=item_stock_number]").val();
        item.quantity = $item.find("[name^=item_quantity]").val();
      },
      newItem: function(e) {
        e.preventDefault();
        // var item = this.add(),
        let item = this.add();
        let inventory_template = Handlebars.compile(document.querySelector('#inventory_template').innerHTML);
        item = inventory_template(item);
        // item = document.querySelector('#inventory_item').textContent.replace(/ID/g, item.id);
        //     $item = $(this.template.replace(/ID/g, item.id));

        // $("#inventory").append($item);
        document.querySelector('#inventory').innerHtml
        console.log(item);
      },
      findParent: function(e) {
        return $(e.target).closest("tr");
      },
      findID: function($item) {
        return +$item.find("input[type=hidden]").val();
      },
      deleteItem: function(e) {
        e.preventDefault();
        var $item = this.findParent(e).remove();
        // let item = this.findParent(e.target);
        // console.log(item);
        this.remove(this.findID($item));
      },
      updateItem: function(e) {
        var $item = this.findParent(e);

        this.update($item);
      },
      bindEvents: function() {
        // $("#add_item").on("click", this.newItem.bind(this));
        document.querySelector('#add_item').addEventListener('click', this.newItem.bind(this));
        $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
        $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
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