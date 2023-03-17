$(function() {
    var dateVolta; var dateIda; var valDia; var deslocamento;

    $(document).tooltip();

    $("#dialogDefault").dialog({
        modal: true,
        autoOpen: false,
        buttons: {
            Ok: function() {
                $(this).dialog("close");
            }
        }
    });

    $('#diaria').mask('000000.00', {reverse: true});

    $('#ida').datepicker();
    $('#volta').datepicker();
    
    $('#diaria').on('change', ()=> {
        valDia = Math.abs(parseFloat($('#diaria').val()));
    });
    
    $('#ida').on('change', ()=> {
        dateIda = new Date($('#ida').val())
    });
    
    $('#volta').on('change', ()=> {
        dateVolta = new Date($('#volta').val())
    });

    $('#sim').on('click', ()=> {
        $(this).prop("checked") === true ? (
            $(this).prop("checked", false),
            deslocamento = false
        ) : (
            $(this).prop("checked", true),
            deslocamento = true
        ); 
    });

    $('#nao').on('click', ()=> {
        $(this).prop("checked") === true ? (
            $(this).prop("checked", false),
            deslocamento = true
        ) : (
            $(this).prop("checked", true),
            deslocamento = false
        ); 
    });

    $('#calcBtn').on('click', (e) => {
        e.preventDefault;
        var msg = "todos os valores são obrigatórios";
        if(dateVolta == undefined || dateIda == undefined || valDia == undefined || deslocamento == undefined || ($('.checkbox:checked').length > 1 || $('.checkbox:checked').length < 1)) {
            ($('.checkbox:checked').length > 1) ? (
                msg += ". E marque apenas uma opção de deslocamento"
            ) : (
                msg += ". E Marque uma das opções de deslocamento"
            ),
            $('#dialogDefault').html(msg);
            $('#dialogDefault').dialog("open");
        } else {
            calculaDiarias(dateVolta, dateIda, valDia, deslocamento);
        }
    });

    const calculaDiarias = (dateVolta, dateIda, valDia, deslocamento) => {
        let diff = (dateVolta.getTime() - dateIda.getTime());
        let diffDias = Math.ceil(diff / (1000 * 3600 * 24));
        if(diffDias == 0) {
            $('#dialogDefault').html("deslocamento = "+ deslocamento +" Valor da diária = "+ (valDia/2));
            $('#dialogDefault').dialog("open");
        } else if(diffDias > 30 || diffDias < 0) {
            $('#dialogDefault').text("Diferença de dias não pode ser maior que 30 e a data de retorno precisa ser superior a de ida");
            $('#dialogDefault').dialog("open");
        } else {
            let totalDiaria = ((diffDias - 1) * valDia) + (valDia/2);
            $('#dialogDefault').text("deslocamento = "+ deslocamento +" Valor da diária = "+ totalDiaria);
            $('#dialogDefault').dialog("open");
        }
    };
});