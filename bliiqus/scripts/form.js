jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});

$(function(){
    var popMessage = [
        "<h3 class='title'>Your Product Has Been Registered!</h3>\
        <p class='text'>Congratulations! You have successfully registered your Bliiq {productName}</p>\
        <p class='text'>You will receive a confirmation email from us shortly.<br/>\
         If you have not received it within the hour, <br/>please <a href='#'>contact us</a>.</p>\
        <p class='text'>Once again thank you very much on your purchase!</p>\
        ",
        "<h3 class='title'>Registration failed!</h3>\
        <p class='text'><span>serial number</span> is not found.</p>",
        "<h3 class='title'>A device with this serial number already exists!</h3>\
        <p class='text'>if you believe this is an error, please <a href='#'>contact us</a>.</p>",
        "<h3 class='title'>Error!!</h3>\
        <p class='text'>Please check again and complete all required fields.</p>",
        "<h3 class='title'>Connect Error!!</h3>\
        <p class='text'>Can't Connect Remote Server!!!</p>"
    ];


    var dataSource = 'https://gist.githubusercontent.com/gnux123/5ac86addf2bae7c649a2a0a7db4c1374/raw/1b83ca26a63bcab7cdc1ec98913f7bfd3347ab38/sn-test.json';
    var userDataPass = '/b2c/ec.asmx/buyerRegister';
    var getSNData = $.get(dataSource);


    $("body").prepend("<div class='mask'></div><div class='popup'>\
        <div class='popupWindow'></div>\
        <a class='btn popClose' href='javascript:void(0);'>Close</a>\
    </div>");

    $(".mask, .popup").hide();

    $(".mask, .popClose").click(function(){
        $(".mask, .popup").fadeOut();
        $(".popupWindow").html();
    });

    //dataTimpicker
    $("#userBirth").datetimepicker({
        format:'Y/m/d',
        timepicker:false,
        datepicker:true
    });

    $("#buyDate").datetimepicker({
        format:'Y/m/d',
        timepicker:false,
        datepicker:true,
        minDate:'2012/01/01'
    });

    //form Vaildate settings
    $("#form").validate({
        highlight: function(element, errorClass, validClass){
            $(element).parents("li").addClass(errorClass).removeClass(validClass);
        },
        unhighlight: function(element, errorClass, validClass){
            $(element).parents("li").removeClass(errorClass).addClass(validClass);
        //     $(element).next("label").remove();
        },
        errorPlacement: function(error, element){
            return true;
        },
        rules: {
            sex: {
                required: true
            },
            userName: { required: true },
            userMail: {
                required: true,
                email: true
            },
            userPhone: {
                required: true,
                digits: true
            },
            productCate: {
                required: true
            },
            // userBirth: {
            //     required: true,
            //     dateISO: true
            // },
            buyDate: {
                required: true,
                dateISO: true
            },
            saleWay: {
                required: true
            }
        },
        messages: {
            userName: { required: "必填欄位" },
            userMail: {
                required: "必填欄位",
                email: "請輸入正確的EMAIL位址"

            },
            userPhone: {
                required: "必填欄位",
                digits: "請輸入正確的電話號碼"
            },
            // userBirth: {
            //     required: "必填欄位",
            //     dateISO: "請輸入正確日期格式"
            // },
            buyDate: {
                required: "必填欄位",
                dateISO: "請輸入正確日期格式"
            },
            productCate: {
                required: "必填欄位"
            },
            saleWay: {
                required: "必填欄位"
            }
        }
    });

    getSNData.done(function(data){
        var changeData = $.parseJSON(data);
        var snLists = changeData.result;
        var snCheck = false;

        //SN Data Check
        $("#snregist").on("change paste keyup",function(){
            var currentVal = $(this).val().toUpperCase();
            $(this).val(currentVal);

            var checkSNlists = snLists.indexOf(currentVal);
            if(checkSNlists != -1){
                $(this).parent("div").removeClass("snValid").addClass("error");
                $(".checkstate").html("×");
                snCheck = false;
            }else{
                $(this).parent("div").removeClass("error").addClass("snValid");
                $(".checkstate").html("√");
                snCheck = true;
            }
        });


        $("#submitData").on("click", function(event){
            checkFormAllData(snCheck);
        });

        function checkFormAllData(snEvent){
            var checkform = $("#form").valid();

            if(checkform == true && snEvent == true){
                var userDataCollect = {};
                var product_sn = $("#snregist").val(),
                    userSex = $("#sex option:selected").val(),
                    userName = $("#userName").val(),
                    acceptNews = $("#acceptNews").is(":checked") ? "true" : "false",
                    productCate = $("#productCate option:selected").val(),
                    userBirth = $("#userBirth").val(),
                    buyDate = $("#buyDate").val(),
                    userMail = $("#userMail").val(),
                    userPhone = $("#userPhone").val(),
                    saleWay = $("#saleWay").val(),
                    gResponse = grecaptcha.getResponse();

                userDataCollect = {
                  "productSN": product_sn,
                  "userSex": userSex,
                  "userName": userName,
                  "userBirth": "",
                  "userMail": userMail,
                  "acceptNews": acceptNews,
                  "userPhone": userPhone,
                  "userAddress": "",
                  "productCate": productCate,
                  "buyDate": buyDate,
                  "saleWay": saleWay,
                  "pravicyCheck": false,
                  "recaptch": gResponse
                };

                var postData = $.post(userDataPass, userDataCollect);

                postData.done(function(data){
                    if(!!data.code && !!data.view){
                        var regStateCode = 1; //data.view.result;

                        switch (regStateCode) {
                            case 1:
                                var _ReplaceHtml = popMessage[0].replace("{productName}",productCate);

                                $(".popupWindow").html(_ReplaceHtml);
                                $(".mask, .popClose").click(function(){
                                    window.location.reload();
                                });
                                break;
                            case 2:
                                $(".popupWindow").html(popMessage[1]);
                                break;
                            case 4:
                                $(".popupWindow").html(popMessage[2]);
                                break;
                            case 8:
                                $(".popupWindow").html(popMessage[3]);
                                break;
                            default:
                        }

                        $(".mask, .popup").fadeIn();
                    }
                }).fail(function(){
                    $(".popupWindow").html(popMessage[4]);
                    $(".mask, .popup").fadeIn();
                });
            }else{
                $(".popupWindow").html(popMessage[3]);
                $(".mask, .popup").fadeIn();

                if(snEvent == false) {
                    $("#snregist").parent("div").addClass("error");
                }
            }
        }

    }).fail(function(){
        $(".popupWindow").html(popMessage[4]);
        $(".mask, .popup").fadeIn();
    });


});
