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
                    // Pokemon typing
                    let type = "";
                    for (let i = 0; i < json.types.length; i++) {
                        let name = json.types[i].type.name;
                        type += name;
                        if (i !== json.types.length - 1) {
                            type += ", ";
                        }
                    }
                    document.getElementById("type").innerHTML = "Type: " + type;

                    let total = 0;
                    for (let i = 0; i < json.stats.length; i++) {
                        total += json.stats[i].base_stat;
                        document.getElementById("stat_" + (i+1)).innerHTML = json.stats[i].base_stat;
                    }
                    document.getElementById("stat_total").innerHTML = total;

                    let abilities = "";
                    for (let i = 0; i < json.abilities.length; i++) {
                        abilities += json.abilities[i].ability.name;
                        if (json.abilities[i].is_hidden) {
                            abilities += " (hidden)";
                        }
                        if (i !== json.abilities.length) {
                            abilities += ", ";
                        }
                    }
                    document.getElementById("abilities").innerHTML = `Abilities: ${abilities}`;

                    
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
                    document.getElementById('locations').innerHTML = location_details;
                });
        });

    // Once all promises have resolved, show the info box.
    Promise.all([pokemonPromise, encounterPromise]).then(() => {
        document.getElementById("gameInfo").style.display = "block";
    })
}