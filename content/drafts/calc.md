+++
date        = "2024-11-25"
title       = "Calculadora modernització"
sections    = []
categories  = []
+++

<form id="costForm"></form>
    <label for="currentCost">Cost Actual:</label>
    <input type="text" id="currentCost" name="currentCost" oninput="calculateCost()"><br><br>


    <label for="futureCost">Cost Futur:</label>
    <input type="number" id="futureCost" name="futureCost" oninput="calculateCost()"><br><br>

    <label for="testCost">Cost Proves:</label>
    <input type="number" id="testCost" name="testCost" oninput="calculateCost()"><br><br>

    <label for="migrationCost">Cost Migració:</label>
    <input type="number" id="migrationCost" name="migrationCost" oninput="calculateCost()"><br><br>
</form>

<p id="result"></p>

<script>
    function calculateCost() {
        const currentCost = parseFloat(document.getElementById('currentCost').value) || 0;
        const futureCost = parseFloat(document.getElementById('futureCost').value) || 0;
        const testCost = parseFloat(document.getElementById('testCost').value) || 0;
        const migrationCost = parseFloat(document.getElementById('migrationCost').value) || 0;

        const result = (futureCost - currentCost) + testCost + migrationCost;
        document.getElementById('result').innerText = 'Diferència de cost AS IS / TO BE: ' + (futureCost - currentCost).toLocaleString('ca-ES', { style: 'currency', currency: 'EUR' });
        //document.getElementById('result').innerText += '\nResult: ' + result;

        if(testCost + migrationCost>0){
            document.getElementById('result').innerText += '\nCost migració + proves: ' + (testCost + migrationCost).toLocaleString('ca-ES', { style: 'currency', currency: 'EUR' });;
        }

        if (result > 0) {
            const amortizationTime = (testCost + migrationCost) / (futureCost - currentCost);
            let years = amortizationTime.toFixed(2);
            years = years < 0 ? years*-1 : years;
            //document.getElementById('result').innerText += '\nTemps d\'amortització: ' + years + ' anys';

            let totalDays = amortizationTime * 365;
            totalDays = totalDays < 0 ? totalDays*-1 : totalDays;
            years = Math.floor(totalDays / 365);
            const months = Math.round((totalDays % 365) / 30);
            const days = Math.round((totalDays % 365) % 30);

            document.getElementById('result').innerText += '\nTemps d\'amortització: ' + years + ' anys, ' + months + ' mesos, ' + days + ' dies';

        }else if(result < 0 && futureCost<currentCost & futureCost>0){
            document.getElementById('result').innerText += '\nTemps d\'amortització: <1 any';
        }
    }

</script>