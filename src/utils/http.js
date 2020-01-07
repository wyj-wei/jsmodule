class HTTP {
  ajaxPost(options) {
    return $.ajax({
      url: options.url,
      type: "post",
      dataType: options.dataType || "json",
      data: options.data
    })
      .done(data => {
        options.success(data);
      })
      .fail(error => {
        options.error(error);
      });
  }
}

export { HTTP };
