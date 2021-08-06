function getStuff() {
    let pokemonName = document.getElementById("searchBox").value;
    let id = ""
    let location_details = ""

    // Collect promises so we can wait to show the info box until all promises have resolved
    const pokemonPromise = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`, {
        headers: {
            'Content-Type': 'application/json',
            credentials: 'include',
        }
    })
        .then(response => {
            return response.json()
                .then(json => {
                    id = json.id;
                    document.getElementById("id").innerHTML = `id: ${id}`;

                    let total = 0;
                    for (let i = 0; i < json.stats.length; i++) {
                        console.log(json.stats[i].base_stat);
                        total += json.stats[i].base_stat;
                        document.getElementById("stat_" + (i+1)).innerHTML = json.stats[i].base_stat;
                    }
                    document.getElementById("stat_total").innerHTML = total;
                });
        });


    const encounterPromise = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/encounters`, {
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
                            let gameName = json[i].version_details[j].version.name;
                            location_details += gameName
                            if (j === json[i].version_details.length - 1) {
                                location_details += ": "
                            }
                            else {
                                location_details += ", "
                            }
                        }
                        location_details += `${area} <br>`;
                    }
                    console.log(location_details);
                    document.getElementById('locations').innerHTML = location_details;

                });
        });

    // Once all promises have resolved, show the info box.
    Promise.all([pokemonPromise, encounterPromise]).then(() => {
        document.getElementById("gameInfo").style.display = "block";
    })
}
