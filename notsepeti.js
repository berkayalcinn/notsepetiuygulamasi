const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSilTamamla);
document.addEventListener('DOMContentLoaded', localStorageOku);

function gorevSilTamamla(e){
    const tiklanilanEleman = e.target;
    if(tiklanilanEleman .classList.contains('gorev-btn-tamamlandi')) {
        console.log('checked tıklandı');
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi')
    }
    if(tiklanilanEleman .classList.contains('gorev-btn-sil')) {

        if (confirm('Emin misiniz?')){
            console.log('delete tıklandı');
            tiklanilanEleman.parentElement.classList.toggle('kaybol')
           
            const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
         
            localStorageSil(silinecekGorev);
            
            tiklanilanEleman.parentElement.addEventListener('transitionend', function(){
                tiklanilanEleman.parentElement.remove();
            }); 
        }
        
       
    }
}

function gorevEkle(e) {
    e.preventDefault();

    if (yeniGorev.value.length > 0){
        gorevItemOlustur(yeniGorev.value);
        //local storagea kaydet
        localStorageaKaydet(yeniGorev.value);
        yeniGorev.value = '';
    } else {
        alert("Lütfen bir not giriniz...")
    }
    


}

function localStorageaKaydet(yeniGorev){
    let gorevler;
    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }
    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}

function localStorageOku () {
    let gorevler;
    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }
    
    gorevler.forEach(function(gorev){
        gorevItemOlustur(gorev);
    });
}

function gorevItemOlustur(gorev){
        // div oluşturma
        const gorevDiv = document.createElement('div');
        gorevDiv.classList.add('gorev-item');

        // li oluşturma
        const gorevLi = document.createElement('li');
        gorevLi.classList.add('gorev-tanim');
        gorevLi.innerText = gorev;
        gorevDiv.appendChild(gorevLi);

        // tamamlandı butonu ekle
        const gorevTamamlandıBtn = document.createElement('button');
        gorevTamamlandıBtn.classList.add('gorev-btn');
        gorevTamamlandıBtn.classList.add('gorev-btn-tamamlandi');
        gorevTamamlandıBtn.innerHTML = '<i class="far fa-check-circle"></i>'
        gorevDiv.appendChild(gorevTamamlandıBtn);

        // sil butonu ekle
        const gorevSilBtn = document.createElement('button');
        gorevSilBtn.classList.add('gorev-btn');
        gorevSilBtn.classList.add('gorev-btn-sil');
        gorevSilBtn.innerHTML = '<i class="fas fa-ban"></i>'
        gorevDiv.appendChild(gorevSilBtn);
        
        // ul'ye oluşturduğumuz div'i ekleme
        gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev){
    let gorevler;
    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

// splice ile item sil
    const silinecekElemanİndexi = gorevler.indexOf(gorev);
    gorevler.splice(silinecekElemanİndexi, 1);

    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}
