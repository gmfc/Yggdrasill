import { Router } from 'express'
import { getMapData } from './MapData'

const router = Router()

export default router.get('/:roomName', async (req, res, next) => {
  res.json(await getMapData(req.params.roomName))
})
