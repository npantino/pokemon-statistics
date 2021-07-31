function getStuff() {
    let pokemonName = document.getElementById("searchBox").value;
    let id = ""
    let location_details = ""
    document.getElementById("gameInfo").style.display = "block";

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`, {
        headers: {
            'Content-Type': 'application/json',
            credentials: 'include',
        }
    })
        .then(response => {
            return response.json()
                .then(json => {
                    id = JSON.stringify(json.id.toString()).replace(/['"]+/g, '');
                    document.getElementById("id").innerHTML = "id: " + id;

                    let total = 0;
                    for (let i = 0; i < json.stats.length; i++) {
                        console.log(json.stats[i].base_stat);
                        total += json.stats[i].base_stat;
                        document.getElementById("stat_" + (i+1).toString()).innerHTML = json.stats[i].base_stat;
                    }
                    document.getElementById("stat_total").innerHTML = total;
                });
        });


    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/encounters`, {
        headers: {
            'Content-Type': 'application/json',
            credentials: 'include',
        }
    })
        .then(response => {
            return response.json()
                .then(json => {
                    for (let i = 0; i < json.length; i++) {
                        let area = json[i].location_area.name;
                        for (let j = 0; j < json[i].version_details.length; j++) {
                            let gameName = "";
                            gameName = json[i].version_details[j].version.name;
                            location_details += gameName
                            if (j === json[i].version_details.length - 1) {
                                location_details += ": "
                            }
                            else {
                                location_details += ", "
                            }
                        }
                        location_details += area + "<br>";
                    }
                    console.log(location_details);
                    location_details = JSON.stringify(location_details).replace(/['"]+/g, '');
                    document.getElementById('locations').innerHTML = location_details;

                });
        });
}