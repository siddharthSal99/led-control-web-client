
class LEDStripDataService {
    constructor(){
        this.scheme = `http://`;
        this.base_url = `localhost:8080`;

    }

    getColors(){
        let endpoint = "/colors";
        let url = `${this.scheme}${this.base_url}${endpoint}`;
        let colors;
        fetch(url)
        .then(resp => resp.json())
        .then(json => colors = json.colors);

        return colors;
        
        
        
    }
    
    async updateColors(newColorPalette){

        let endpoint = "/colors";
        let url = `${this.scheme}${this.base_url}${endpoint}`;

        let response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newColorPalette)
          });

        if (response.ok) { // if HTTP-status is 200-299
            // get the response body (the method explained below)
            let json = await response.json();
            return json.colors;
        } else {
            alert("HTTP-Error: " + response.status);
            return -1
        }
    
    }
    
    getStartTime(){
    
    }

    updateStartTime(newStartTime){

    }

    getEndTime(){

    }

    updateEndTime(newEndTime){

    }

    getPattern(){

    }

    updatePattern(newPattern){

    }

    getEnabled(){

    }

    updateEnabled(newForcedState){

    }


}



export default LEDStripDataService