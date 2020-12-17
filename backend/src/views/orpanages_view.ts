import Orpanage from '../models/Orpanages'
import imagesView from './images_view'

export default {
    render(orpanage:Orpanage) {
        return {
            id: orpanage.id,
            name: orpanage.name,
            latitude: orpanage.latitude,
            longitude: orpanage.longitude,
            about: orpanage.about,
            instructions: orpanage.instructions,
            opening_hours: orpanage.opening_hours,
            open_on_wekends: orpanage.open_on_wekends,
            images: imagesView.renderMany(orpanage.images)

        }
    },

    renderMany(orpanages: Orpanage[]) {
        return orpanages.map(orpanage => this.render(orpanage))
    }
}