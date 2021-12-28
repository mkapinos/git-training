<template>
  <div class="about">
    <h1>This is chart page {{count}}</h1>
    <ol>
        <li v-for="item in people" :key="item.id">
            {{item.first_name}} {{item.last_name}}
        </li>
    </ol>

    <canvas id="myChart"></canvas>
  </div>
</template>
<script>
export default {
  name: "Chart",
  components: {
  },
  data() {
    return {
      count: 1,
      people: []
    }
  },
  mounted() {
    fetch('https://my.api.mockaroo.com/people.json?key=5eb15bf0')
    .then(response => response.json())
    .then(data => {
        this.people = data;
            console.log(data);

        const countFemale = data.reduce((prev, curr) => {
        if (curr.gender === 'Female') {
            prev++;
        }
        return prev;
        }, 0);
        const countMale = data.reduce((prev, curr) => {
        if (curr.gender === 'Male') {
            prev++;
        }
        return prev;
        }, 0);
        const countOther = data.length - countFemale - countMale;

        const dataset = {
        datasets: [{
            data: [countFemale, countMale, countOther],
            backgroundColor: [
            '#ff0000',
            '#0000ff',
            '#00ff00'
            ],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Female',
            'Male',
            'Other'
        ]
        };

        const config = {
        type: 'pie',
        data: dataset,
        options: {}
        };

        new window.Chart(
            document.getElementById('myChart'),
            config
        );
    });

  }
};
</script>