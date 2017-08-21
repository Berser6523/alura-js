class NegociacaoContoller{
    
    
    constructor(){
        
        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        let self = this;
        
        this._listaNegociaoes = new Proxy(new ListaNegociacoes(),{
           get(target,prop,reciver){
               
                if(['adiciona','esvazia'].includes(prop) && typeof(target[prop] == typeof(Function))){
                    return function(){
                        console.log(`interceptando ${prop}`);
                        Reflect.apply(target[prop],target,arguments);
                        self._negociaoesView._update(target);
                    }
                }
                
                return Reflect.get(target,prop,reciver);
           } 
        });
        
        this._negociaoesView = new NegociaoesView($("#negociaoesView"));//Criando um objeto do arquivo NegociaoesView.js
        this._negociaoesView._update(this._listaNegociaoes);
        
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView._update(this._mensagem);
    }
    
    adiciona(event){
        event.preventDefault();
        this._listaNegociaoes.adiciona(this._criaNegociacao());//add um negocião passando como parametro um metodo e esse metodo me retorna um objeto da class Negociacao
        this._mensagem.texto = "Negociação Adicionada Com Sucesso !";
        
        
        this._mensagemView._update(this._mensagem);
        this._limpaFormulario();
    
    }
    
    apaga(){
        this._listaNegociaoes.esvazia();
        
        this._mensagem.texto = "Negociação Appagada Com Sucesso !";
        this._mensagemView._update(this._mensagem);
    }
    
    _criaNegociacao(){
        return new Negociacao(
                DateHelper.textoParaData(this._inputData.value),//setando valores para o constructor da class Negociacao
                this._inputQuantidade.value,
                this._inputValor.value
                );
    }
    
    _limpaFormulario(){
        this._inputValor.value = "0.0"
        this._inputQuantidade.value = "1"
        this._inputData.value = ""
        this._inputData.focus();
    }
    
}