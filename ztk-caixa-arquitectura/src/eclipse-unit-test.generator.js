/* 
* This file is part of the Zeta distribution (https://github.com/hermosillaeveris/zeta-libs.git).
* Copyright (c) 2019 Zeta Team.
* 
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, version 3.
*
* This program is distributed in the hope that it will be useful, but 
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
* General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

module.exports = {

  generate() {
    return this._getFromTemplate();
  },

  _getFromTemplate() {
    return `
    <!DOCTYPE html>
    <html>

    <head>
      <style>
        body { font-size: 11px; font-family: Arial, Helvetica, sans-serif; margin: 0px;  }
        .eclipse { position: relative; width: 746px; height: 90px;
          background:
          url('data:image/png;base64,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')
          no-repeat left; 
        }
        .finished { position: absolute; left: 4px; top: 5px; }
        .runs { position: absolute; left: 52px; top: 38px; }
        .errors { position: absolute; left: 192px; top: 38px; }
        .failures { position: absolute; left: 327px; top: 38px; }
        .trace { position: absolute; left: 541px; top: 69px; }
        .test { width: 746px; overflow: hidden;
          background:
          url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAuoAAAABCAYAAACIe4vOAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kTtIw1AUhv+mSn1UROwg4pChOlkQFXHUKhShQqgVWnUwuelDaNKQpLg4Cq4FBx+LVQcXZ10dXAVB8AHi5Oik6CIlnpsUWsR44HI//nv+n3vPBYRaiWlW2xig6baZSsTFTHZFDL0igE6E0IdumVnGrCQl4Vtf99RNdRfjWf59f1aPmrMYEBCJZ5hh2sTrxFObtsF5nzjCirJKfE48atIFiR+5rnj8xrngssAzI2Y6NUccIRYLLay0MCuaGvEkcVTVdMoXMh6rnLc4a6UKa9yTvzCc05eXuE5rCAksYBESRCioYAMl2IjRrpNiIUXncR//oOuXyKWQawOMHPMoQ4Ps+sH/4PdsrfzEuJcUjgPtL47zMQyEdoF61XG+jx2nfgIEn4Ervekv14DpT9KrTS16BPRuAxfXTU3ZAy53gIEnQzZlVwrSEvJ54P2MvikL9N8CXave3BrnOH0A0jSr5A1wcAiMFCh7zefdHa1z+7enMb8f2oVyapSnVzkAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfkAQkIHSDLeIhiAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAADpJREFUSMdjXLNi5n8HR3sGBgYGBmExdYZRMApGwSgYBaNgFIws8PbVTTh7tC0wCkbB4MiPB/YfZAAAcPIL7pXp5zgAAAAASUVORK5CYII=')
          left;
        }
        .wrapper { font-size: 9.5px; margin-left: 33px; width: 470px;}
        .unit {  white-space: nowrap; padding: 2px 0px 2px 31px; height: 13px; overflow: hidden;
          background:
          url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAPCAYAAAAVk7TYAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kTtIw1AUhv+mSn1UROwg4pChOlkQFXHUKhShQqgVWnUwuelDaNKQpLg4Cq4FBx+LVQcXZ10dXAVB8AHi5Oik6CIlnpsUWsR44HI//nv+n3vPBYRaiWlW2xig6baZSsTFTHZFDL0igE6E0IdumVnGrCQl4Vtf99RNdRfjWf59f1aPmrMYEBCJZ5hh2sTrxFObtsF5nzjCirJKfE48atIFiR+5rnj8xrngssAzI2Y6NUccIRYLLay0MCuaGvEkcVTVdMoXMh6rnLc4a6UKa9yTvzCc05eXuE5rCAksYBESRCioYAMl2IjRrpNiIUXncR//oOuXyKWQawOMHPMoQ4Ps+sH/4PdsrfzEuJcUjgPtL47zMQyEdoF61XG+jx2nfgIEn4Ervekv14DpT9KrTS16BPRuAxfXTU3ZAy53gIEnQzZlVwrSEvJ54P2MvikL9N8CXave3BrnOH0A0jSr5A1wcAiMFCh7zefdHa1z+7enMb8f2oVyapSnVzkAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfkAQkKJDGsyPFEAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAc1JREFUOMutkz9oFFEQh799L6wX7iAWcgkWt9gEKysbCYSIxD8QsTAgaiFncUUKCwU5RDxEQSJcEkVSiJJDQkA5lYBiVCRrZRpRMIWIgqcYvCskuRhZsrtvLAKBRaNm14EHb978hh8zfM8SESFmPLzSvS59Cwmjd2D6n3RPR3eikhgFYiECxWfDfF5oIMKaJxAr2WRBqDBAEAYAmL9oE5n5RhGGsLj8A4C5ZiNSb09nqS81aE9n8U1Cs0257RgRmt/mKU1fpUVptNJordGWYnBXkdOTlxg7PIRvEq5xY7YTY0BSimv7LvxSNwZuHhrCGPBDhbVe9PVY35q1l70jkTzX5vBpoUauzeHOSF+8yfKbe6J552663TMUnwxiK5uUttmgbIb3X+REtcS94xWWkwIC0O900bVlG7hw6+BodI0C1XwFI8QHxPO81fverTu4MTO5QuNiLaLryDh8/V6jI+Pgx51s/MBZpt6+oOktAeDW3wAwcP8cGZ0irVtptWzK/Zc5Nn6SqcJdgjAmjaXH1zm/pwBA2Z2g6a38s+rRSkQnCI8KVQSJj/6r+Y+U3QlO9RzheX129X125jZzXz7w/t3r33RZ/xf9MP/gj70/AcCzvJWnAUWDAAAAAElFTkSuQmCC')
          no-repeat left;
        }
        .time { color: #007fae; }
      </style>
    </head>

    <body>
      <div class="eclipse">
        <div class="finished">Finished after <span class="seconds">0.000</span> seconds</div>
        <div class="runs">1/1</div>
        <div class="errors">0</div>
        <div class="failures">0</div>
        <div class="trace">Failure Trace</div>
        <div style="white-space: nowrap; height: 12px; position: absolute; left: 47px; top: 75px; font-size: 9.5px; width: 460px; overflow: hidden;">es.lacaixa.absis.arch25.service.connector.business.methodInvoker.HttpBOMethodInvokerTest [Runner: JUnit 4] <span class="time">(0.000 s)</span></div>
      </div>
      <div class="test">
      <div class="wrapper">
        <div class="unit">no_nothing_test <span class="time">(0.000 s)</span></div>
      </div>
      </div>
    </body>

    </html>
    `;
  }
};
