// ...existing code...
import React, { FC } from 'react'

interface WeatherData{
  location:{
    name:string;
    region:string;
    country:string;
    localtime:string;
  };
  current:{
    temp_c:number;
    condition:{
      text:string;
      code:number;
    }
  }
}
interface WeatherCardProps{
  weatherData:WeatherData | null | undefined;
}
interface WeatherStyle{
  backgroundColor:string;
  accentColor:string;
  textColor:string;
  borderColor:string;
}
// ...existing code...

/**
 * Map a condition string to simple color styles.
 */
const getWeatherStyle = (conditionText = ''): WeatherStyle => {
  const t = conditionText.toLowerCase()
  if (t.includes('sun') || t.includes('clear')) {
    return { backgroundColor: '#fff7e6', accentColor: '#ffb347', textColor: '#663e00', borderColor: '#ffdca8' }
  }
  if (t.includes('cloud') || t.includes('overcast')) {
    return { backgroundColor: '#f0f4f8', accentColor: '#90a4ae', textColor: '#21303f', borderColor: '#d6e0ea' }
  }
  if (t.includes('rain') || t.includes('drizzle') || t.includes('shower')) {
    return { backgroundColor: '#e8f0ff', accentColor: '#4dabf7', textColor: '#04263b', borderColor: '#cfe6ff' }
  }
  if (t.includes('snow') || t.includes('sleet')) {
    return { backgroundColor: '#f8fbff', accentColor: '#9fbadf', textColor: '#22313a', borderColor: '#e6f0fb' }
  }
  // default
  return { backgroundColor: '#ffffff', accentColor: '#6c757d', textColor: '#212529', borderColor: '#e9ecef' }
}

const WeatherCard: FC<WeatherCardProps> = ({ weatherData }) => {
  if (!weatherData) {
    return (
      <div style={{
        padding: 12,
        borderRadius: 8,
        border: '1px solid #e9ecef',
        width: 260,
        fontFamily: 'Segoe UI, Roboto, sans-serif',
        color: '#6c757d',
        background: '#fff'
      }}>
        No weather data
      </div>
    )
  }

  const { location, current } = weatherData
  const style = getWeatherStyle(current.condition.text)
  const containerStyle: React.CSSProperties = {
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    border: `1px solid ${style.borderColor}`,
    borderRadius: 8,
    padding: 14,
    width: 280,
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    boxShadow: `0 2px 6px ${style.borderColor}33`
  }

  return (
    <div style={containerStyle} role="region" aria-label={`Weather for ${location.name}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{location.name}</div>
          <div style={{ fontSize: 12, color: style.accentColor }}>{location.region ? `${location.region}, ${location.country}` : location.country}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{Math.round(current.temp_c)}°C</div>
          <div style={{ fontSize: 12, color: style.accentColor }}>{current.condition.text}</div>
        </div>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: '#6c757d' }}>
        Local time: {location.localtime}
      </div>
    </div>
  )
}

export default WeatherCard
// ...existing code...