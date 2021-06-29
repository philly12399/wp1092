import { Select } from 'antd';
import Champion from '../data/Champion.json'

const { Option } = Select;

const SearchObject = ({setHero}) => {
    const champions = Object.entries(Champion)
    return (
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a hero"
            optionFilterProp="children"
            onChange={(value)=>{setHero(value)}}
            filterOption={(input, option) => {
                const [chinese, english] = option.children.split(' ')
                return chinese.toLowerCase().indexOf(input.toLowerCase()) === 0 || english.toLowerCase().indexOf(input.toLowerCase()) === 0
            }
            }
        >
            {champions.map((champion)=>(
                <Option value={champion[1]}>{champion[0]+' '+champion[1]}</Option>
            ))}
        </Select>
    )
}

export default SearchObject