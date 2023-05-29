window.onload = function(){
    formulir = document.getElementById('formulir')
    
    tableDinamis = document.getElementById('tableDinamis')


    formulir.addEventListener('submit', function(e){
        e.preventDefault()

        namaLengkap = document.getElementById('namaLengkap').value
        jenisKelamin = document.getElementById('jenisKelamin').value
        noHp = document.getElementById('noHp').value
        alamat = document.getElementById('alamat').value
        var biodata = new Biodata(namaLengkap, jenisKelamin, noHp, alamat)
        UI.clearFields()
        UI.displayData(biodata)
        Store.setStored(biodata)
    })


    tableDinamis.addEventListener('click', function(e){
        //e.target.classList.contains('removeIt')
        UI.removeRow(e.target)
    })


    class Biodata{
        constructor(namaLengkap, jenisKelamin, noHp, alamat){
            this.namaLengkap = namaLengkap
            this.jenisKelamin = jenisKelamin
            this.noHp = noHp
            this.alamat = alamat
        }
    }


    class UI{
        static clearFields(){
            document.getElementById('namaLengkap').value = ''
            document.getElementById('jenisKelamin').value = ''
            document.getElementById('noHp').value = ''
            document.getElementById('alamat').value = ''
        }

        static displayData(biodata){
            //get value from local storage
            let newBio = Store.getStored()
            newBio.push(biodata)
            UI.populateRow(newBio)

        }

        static populateRow(newBio){
            //array

            while(tableDinamis.firstChild){
                tableDinamis.firstChild.remove(tableDinamis.firstChild)
            }
            newBio.forEach(onebyone => {
                tableDinamis.innerHTML += `
                <tr>
                    <td>${onebyone.namaLengkap}</td>
                    <td>${onebyone.jenisKelamin}</td>
                    <td>${onebyone.noHp}</td>
                    <td>${onebyone.alamat}</td>
                    <td><button class='btn btn-danger removeIt'>X</button></td>
                </tr>
                `
            })
        }

        static removeRow(element){
            if(element.classList.contains('removeIt')){
                let namaLengkap = element.parentElement.parentElement.firstElementChild.innerText;
                element.parentElement.parentElement.remove();
                Store.removeStoredValue(namaLengkap)
            }
        }
    }

    class Store{ //will handle local storage data
        static getStored(){
            let newBio = ''
            if(localStorage.getItem('biodata') == null){
                newBio = []
            }else{
                newBio = JSON.parse(localStorage.getItem('biodata'))
            }
            return newBio
        }

        static setStored(obj){
            let newBioFromLocalStorage = Store.getStored()
            newBioFromLocalStorage.push(obj)
            localStorage.setItem('biodata', JSON.stringify(newBioFromLocalStorage))
        }

        static removeStoredValue(namaLengkap){
            let Allvalues = Store.getStored()
            Allvalues.forEach(function(onebyone, index){
                if (onebyone.namaLengkap == namaLengkap){
                    Allvalues.splice(index, 1)
                }
                
            })
            localStorage.setItem('biodata', JSON.stringify(Allvalues))
        }
    }


    UI.populateRow(Store.getStored())


}